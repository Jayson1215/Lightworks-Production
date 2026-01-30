<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use App\Models\Payment;
use App\Models\AddOn;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['create', 'store']);
    }

    public function index()
    {
        $bookings = auth()->user()->bookings()->with('service')->orderBy('booking_date', 'desc')->get();
        
        if (request()->wantsJson()) {
            return response()->json([
                'data' => $bookings
            ]);
        }

        $bookings = $bookings->paginate(10);
        return view('bookings.index', compact('bookings'));
    }

    public function create($serviceId)
    {
        $service = Service::findOrFail($serviceId);
        $addOns = AddOn::where('is_active', true)->get();
        $availableSlots = $service->availabilitySlots()
            ->where('available_date', '>=', now()->toDateString())
            ->where('is_booked', false)
            ->orderBy('available_date')
            ->get();

        return view('bookings.create', compact('service', 'addOns', 'availableSlots'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'booking_date' => 'required|date_format:Y-m-d H:i',
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string',
            'special_requests' => 'nullable|string',
            'add_ons' => 'nullable|array',
        ]);

        $service = Service::findOrFail($validated['service_id']);
        $totalCost = $service->base_price;

        // Add add-ons to total
        if (!empty($validated['add_ons'])) {
            $addOns = AddOn::whereIn('id', $validated['add_ons'])->get();
            $totalCost += $addOns->sum('price');
        }

        $booking = Booking::create([
            'user_id' => auth()->id() ?? null,
            'service_id' => $validated['service_id'],
            'booking_date' => $validated['booking_date'],
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'special_requests' => $validated['special_requests'] ?? null,
            'total_cost' => $totalCost,
            'status' => 'pending',
        ]);

        // Attach add-ons
        if (!empty($validated['add_ons'])) {
            $addOns = AddOn::whereIn('id', $validated['add_ons'])->get();
            foreach ($addOns as $addOn) {
                $booking->addOns()->attach($addOn->id, ['price' => $addOn->price]);
            }
        }

        if (request()->wantsJson()) {
            return response()->json([
                'message' => 'Booking created successfully',
                'data' => $booking
            ], 201);
        }

        return redirect()->route('bookings.checkout', $booking->id);
    }

    public function checkout($id)
    {
        $booking = Booking::findOrFail($id);
        return view('bookings.checkout', compact('booking'));
    }

    public function edit($id)
    {
        $booking = Booking::findOrFail($id);
        
        if ($booking->status !== 'pending' && $booking->status !== 'confirmed') {
            return back()->with('error', 'Cannot modify this booking.');
        }

        $service = $booking->service;
        $addOns = AddOn::where('is_active', true)->get();
        
        return view('bookings.edit', compact('booking', 'service', 'addOns'));
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        
        if ($booking->status !== 'pending' && $booking->status !== 'confirmed') {
            return back()->with('error', 'Cannot modify this booking.');
        }

        $validated = $request->validate([
            'booking_date' => 'required|date_format:Y-m-d H:i',
            'special_requests' => 'nullable|string',
            'add_ons' => 'nullable|array',
        ]);

        $booking->booking_date = $validated['booking_date'];
        $booking->special_requests = $validated['special_requests'] ?? null;

        // Recalculate total
        $totalCost = $booking->service->base_price;
        if (!empty($validated['add_ons'])) {
            $addOns = AddOn::whereIn('id', $validated['add_ons'])->get();
            $totalCost += $addOns->sum('price');
        }
        $booking->total_cost = $totalCost;
        $booking->save();

        // Update add-ons
        $booking->addOns()->sync($validated['add_ons'] ?? []);

        return redirect()->route('bookings.show', $booking->id)->with('success', 'Booking updated successfully.');
    }

    public function cancel($id)
    {
        $booking = Booking::findOrFail($id);
        
        if ($booking->status === 'completed' || $booking->status === 'cancelled') {
            return back()->with('error', 'Cannot cancel this booking.');
        }

        $booking->status = 'cancelled';
        $booking->save();

        // Handle refund if payment exists
        if ($booking->payment && $booking->payment->status === 'completed') {
            $booking->payment->status = 'refunded';
            $booking->payment->save();
        }

        return back()->with('success', 'Booking cancelled successfully.');
    }

    public function show($id)
    {
        $booking = Booking::findOrFail($id);
        
        if (request()->wantsJson()) {
            return response()->json([
                'data' => $booking
            ]);
        }

        return view('bookings.show', compact('booking'));
    }
}

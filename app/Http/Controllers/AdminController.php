<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Booking;
use App\Models\Portfolio;
use App\Models\AddOn;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin');
    }

    public function dashboard()
    {
        $totalBookings = Booking::count();
        $totalRevenue = Payment::where('status', 'completed')->sum('amount');
        $pendingBookings = Booking::where('status', 'pending')->count();
        $recentBookings = Booking::latest()->limit(5)->get();

        return view('admin.dashboard', compact('totalBookings', 'totalRevenue', 'pendingBookings', 'recentBookings'));
    }

    // Services Management
    public function servicesIndex()
    {
        $services = Service::paginate(10);
        return view('admin.services.index', compact('services'));
    }

    public function servicesCreate()
    {
        return view('admin.services.create');
    }

    public function servicesStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'base_price' => 'required|numeric',
            'duration_minutes' => 'required|integer',
            'category' => 'required|string',
            'package_details' => 'nullable|string',
            'max_bookings_per_day' => 'nullable|integer',
        ]);

        Service::create($validated);
        return redirect()->route('admin.services.index')->with('success', 'Service created successfully.');
    }

    public function servicesEdit($id)
    {
        $service = Service::findOrFail($id);
        return view('admin.services.edit', compact('service'));
    }

    public function servicesUpdate(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'base_price' => 'required|numeric',
            'duration_minutes' => 'required|integer',
            'category' => 'required|string',
            'package_details' => 'nullable|string',
            'max_bookings_per_day' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $service->update($validated);
        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully.');
    }

    public function servicesDestroy($id)
    {
        Service::destroy($id);
        return back()->with('success', 'Service deleted successfully.');
    }

    // Portfolio Management
    public function portfolioIndex()
    {
        $portfolios = Portfolio::paginate(10);
        return view('admin.portfolio.index', compact('portfolios'));
    }

    public function portfolioCreate()
    {
        return view('admin.portfolio.create');
    }

    public function portfolioStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image_path' => 'required|image|max:5000',
            'category' => 'required|string',
            'is_featured' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('portfolio', 'public');
            $validated['image_path'] = $path;
        }

        Portfolio::create($validated);
        return redirect()->route('admin.portfolio.index')->with('success', 'Portfolio item created successfully.');
    }

    public function portfolioEdit($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        return view('admin.portfolio.edit', compact('portfolio'));
    }

    public function portfolioUpdate(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image_path' => 'nullable|image|max:5000',
            'category' => 'required|string',
            'is_featured' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('portfolio', 'public');
            $validated['image_path'] = $path;
        }

        $portfolio->update($validated);
        return redirect()->route('admin.portfolio.index')->with('success', 'Portfolio item updated successfully.');
    }

    public function portfolioDestroy($id)
    {
        Portfolio::destroy($id);
        return back()->with('success', 'Portfolio item deleted successfully.');
    }

    // Bookings Management
    public function bookingsIndex()
    {
        $bookings = Booking::with('service', 'user')->paginate(10);
        return view('admin.bookings.index', compact('bookings'));
    }

    public function bookingsShow($id)
    {
        $booking = Booking::with('service', 'payment', 'addOns')->findOrFail($id);
        return view('admin.bookings.show', compact('booking'));
    }

    public function bookingsUpdateStatus(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $validated = $request->validate(['status' => 'required|in:pending,confirmed,completed,cancelled']);
        $booking->update($validated);
        return back()->with('success', 'Booking status updated.');
    }

    // Add-ons Management
    public function addOnsIndex()
    {
        $addOns = AddOn::paginate(10);
        return view('admin.add-ons.index', compact('addOns'));
    }

    public function addOnsCreate()
    {
        return view('admin.add-ons.create');
    }

    public function addOnsStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
        ]);

        AddOn::create($validated);
        return redirect()->route('admin.add-ons.index')->with('success', 'Add-on created successfully.');
    }

    // Reports
    public function reports()
    {
        $bookingsByStatus = Booking::selectRaw('status, count(*) as total')->groupBy('status')->get();
        $revenueByMonth = Payment::selectRaw('DATE_TRUNC(\'month\', created_at) as month, sum(amount) as total')
            ->where('status', 'completed')
            ->groupBy('month')
            ->get();
        
        return view('admin.reports', compact('bookingsByStatus', 'revenueByMonth'));
    }
}

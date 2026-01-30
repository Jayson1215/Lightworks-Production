<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\AddOn;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)->get();

        if (request()->wantsJson()) {
            return response()->json([
                'data' => $services
            ]);
        }

        $services = $services->paginate(9);
        return view('services.index', compact('services'));
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        
        if (request()->wantsJson()) {
            return response()->json([
                'data' => $service
            ]);
        }

        $addOns = AddOn::where('is_active', true)->get();
        $relatedServices = Service::where('category', $service->category)
            ->where('id', '!=', $id)
            ->where('is_active', true)
            ->limit(3)
            ->get();

        return view('services.show', compact('service', 'addOns', 'relatedServices'));
    }

    public function getAvailability($id)
    {
        $service = Service::findOrFail($id);
        $availabilitySlots = $service->availabilitySlots()
            ->where('available_date', '>=', now()->toDateString())
            ->where('is_booked', false)
            ->orderBy('available_date')
            ->orderBy('start_time')
            ->get();

        return response()->json($availabilitySlots);
    }
}

@extends('layouts.app')

@section('title', 'Admin Dashboard')

@section('content')
    <div class="py-5">
        <div class="container-fluid">
            <h1 class="section-title mb-4">Admin Dashboard</h1>

            <!-- Stats Cards -->
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="card text-white" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);">
                        <div class="card-body">
                            <h6 class="card-title text-white-50">Total Bookings</h6>
                            <h2 class="mb-0">{{ $totalBookings }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-white" style="background: linear-gradient(135deg, var(--accent-color) 0%, #27ae60 100%);">
                        <div class="card-body">
                            <h6 class="card-title text-white-50">Total Revenue</h6>
                            <h2 class="mb-0">${{ number_format($totalRevenue, 2) }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-white" style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);">
                        <div class="card-body">
                            <h6 class="card-title text-white-50">Pending Bookings</h6>
                            <h2 class="mb-0">{{ $pendingBookings }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card" style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white;">
                        <div class="card-body">
                            <h6 class="card-title text-white-50">Completion Rate</h6>
                            <h2 class="mb-0">{{ $totalBookings > 0 ? round(($totalBookings - $pendingBookings) / $totalBookings * 100) : 0 }}%</h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Admin Navigation -->
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Management</h5>
                    <div class="btn-group flex-wrap" role="group">
                        <a href="{{ route('admin.services.index') }}" class="btn btn-outline-primary">Services</a>
                        <a href="{{ route('admin.portfolio.index') }}" class="btn btn-outline-primary">Portfolio</a>
                        <a href="{{ route('admin.bookings.index') }}" class="btn btn-outline-primary">Bookings</a>
                        <a href="{{ route('admin.add-ons.index') }}" class="btn btn-outline-primary">Add-ons</a>
                        <a href="{{ route('admin.reports') }}" class="btn btn-outline-primary">Reports</a>
                    </div>
                </div>
            </div>

            <!-- Recent Bookings -->
            <div class="card">
                <div class="card-header bg-light">
                    <h5 class="mb-0">Recent Bookings</h5>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($recentBookings as $booking)
                                <tr>
                                    <td><strong>#{{ $booking->id }}</strong></td>
                                    <td>{{ $booking->customer_name }}</td>
                                    <td>{{ $booking->service->name }}</td>
                                    <td>{{ $booking->booking_date->format('M d, Y') }}</td>
                                    <td class="text-success">${{ number_format($booking->total_cost, 2) }}</td>
                                    <td>
                                        @if($booking->status === 'pending')
                                            <span class="badge bg-warning">Pending</span>
                                        @elseif($booking->status === 'confirmed')
                                            <span class="badge bg-success">Confirmed</span>
                                        @else
                                            <span class="badge bg-secondary">{{ ucfirst($booking->status) }}</span>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{ route('admin.bookings.show', $booking->id) }}" class="btn btn-sm btn-primary">View</a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center text-muted py-3">No bookings yet</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection

@extends('layouts.app')

@section('title', 'My Bookings')

@section('content')
    <div class="py-5">
        <div class="container">
            <h1 class="section-title mb-4">My Bookings</h1>

            @if($bookings->count() > 0)
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Booking ID</th>
                                <th>Service</th>
                                <th>Date & Time</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($bookings as $booking)
                                <tr>
                                    <td><strong>#{{ $booking->id }}</strong></td>
                                    <td>{{ $booking->service->name }}</td>
                                    <td>{{ $booking->booking_date->format('M d, Y h:i A') }}</td>
                                    <td class="text-success"><strong>${{ number_format($booking->total_cost, 2) }}</strong></td>
                                    <td>
                                        @if($booking->status === 'pending')
                                            <span class="badge bg-warning">Pending</span>
                                        @elseif($booking->status === 'confirmed')
                                            <span class="badge bg-success">Confirmed</span>
                                        @elseif($booking->status === 'completed')
                                            <span class="badge bg-info">Completed</span>
                                        @else
                                            <span class="badge bg-danger">Cancelled</span>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{ route('bookings.show', $booking->id) }}" class="btn btn-sm btn-primary">View</a>
                                        @if($booking->status === 'pending' || $booking->status === 'confirmed')
                                            <a href="{{ route('bookings.edit', $booking->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                @if($bookings->hasPages())
                    <div class="mt-4">
                        {{ $bookings->links('pagination::bootstrap-5') }}
                    </div>
                @endif
            @else
                <div class="alert alert-info text-center">
                    <p>You don't have any bookings yet.</p>
                    <a href="{{ route('services.index') }}" class="btn btn-primary">Browse Services</a>
                </div>
            @endif
        </div>
    </div>
@endsection

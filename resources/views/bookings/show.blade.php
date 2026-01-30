@extends('layouts.app')

@section('title', 'Booking Details')

@section('content')
    <div class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">Booking #{{ $booking->id }}</h5>
                        </div>
                        <div class="card-body">
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <h6>Service Details</h6>
                                    <p>
                                        <strong>{{ $booking->service->name }}</strong><br>
                                        <small class="text-muted">{{ $booking->service->description }}</small>
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Booking Status</h6>
                                    <p>
                                        @if($booking->status === 'pending')
                                            <span class="badge bg-warning">Pending Payment</span>
                                        @elseif($booking->status === 'confirmed')
                                            <span class="badge bg-success">Confirmed</span>
                                        @elseif($booking->status === 'completed')
                                            <span class="badge bg-info">Completed</span>
                                        @else
                                            <span class="badge bg-danger">Cancelled</span>
                                        @endif
                                    </p>
                                </div>
                            </div>

                            <hr>

                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <h6>Session Information</h6>
                                    <p>
                                        <strong>Date & Time:</strong><br>
                                        {{ $booking->booking_date->format('l, F d, Y h:i A') }}<br><br>
                                        <strong>Duration:</strong><br>
                                        {{ $booking->service->duration_minutes }} minutes
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Customer Information</h6>
                                    <p>
                                        <strong>Name:</strong> {{ $booking->customer_name }}<br>
                                        <strong>Email:</strong> {{ $booking->customer_email }}<br>
                                        <strong>Phone:</strong> {{ $booking->customer_phone }}
                                    </p>
                                </div>
                            </div>

                            @if($booking->special_requests)
                                <hr>
                                <h6>Special Requests</h6>
                                <p>{{ $booking->special_requests }}</p>
                            @endif

                            @if($booking->addOns->count() > 0)
                                <hr>
                                <h6>Add-on Services</h6>
                                <ul>
                                    @foreach($booking->addOns as $addon)
                                        <li>{{ $addon->name }} - <span class="text-success">${{ number_format($addon->pivot->price, 2) }}</span></li>
                                    @endforeach
                                </ul>
                            @endif
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h6 class="card-title">Cost Summary</h6>
                            <hr>
                            <div class="mb-3">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>{{ $booking->service->name }}</span>
                                    <span class="text-success">${{ number_format($booking->service->base_price, 2) }}</span>
                                </div>

                                @if($booking->addOns->count() > 0)
                                    @foreach($booking->addOns as $addon)
                                        <div class="d-flex justify-content-between mb-2">
                                            <span><small>{{ $addon->name }}</small></span>
                                            <span class="text-success"><small>+${{ number_format($addon->pivot->price, 2) }}</small></span>
                                        </div>
                                    @endforeach
                                @endif
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between align-items-center">
                                <h6 class="mb-0">Total:</h6>
                                <h5 class="text-success mb-0"><strong>${{ number_format($booking->total_cost, 2) }}</strong></h5>
                            </div>
                        </div>
                    </div>

                    @if($booking->payment)
                        <div class="card mb-4">
                            <div class="card-body">
                                <h6 class="card-title">Payment Status</h6>
                                <hr>
                                <div class="mb-2">
                                    <p class="text-muted mb-1">Method</p>
                                    <p class="mb-0"><strong>{{ ucfirst(str_replace('_', ' ', $booking->payment->payment_method)) }}</strong></p>
                                </div>
                                <div class="mb-2">
                                    <p class="text-muted mb-1">Status</p>
                                    <p class="mb-0">
                                        @if($booking->payment->status === 'completed')
                                            <span class="badge bg-success">Completed</span>
                                        @elseif($booking->payment->status === 'pending')
                                            <span class="badge bg-warning">Pending</span>
                                        @else
                                            <span class="badge bg-danger">{{ ucfirst($booking->payment->status) }}</span>
                                        @endif
                                    </p>
                                </div>
                            </div>
                        </div>
                    @endif

                    @if($booking->status === 'pending' || $booking->status === 'confirmed')
                        <div class="card">
                            <div class="card-body">
                                <a href="{{ route('bookings.edit', $booking->id) }}" class="btn btn-warning w-100 mb-2">Edit Booking</a>
                                <form action="{{ route('bookings.cancel', $booking->id) }}" method="POST" onsubmit="return confirm('Are you sure?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger w-100">Cancel Booking</button>
                                </form>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <div class="mt-4">
                <a href="{{ route('bookings.index') }}" class="btn btn-outline-primary">Back to My Bookings</a>
            </div>
        </div>
    </div>
@endsection

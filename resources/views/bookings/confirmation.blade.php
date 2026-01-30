@extends('layouts.app')

@section('title', 'Booking Confirmation')

@section('content')
    <div class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card text-center">
                        <div class="card-body py-5">
                            <div class="mb-4">
                                <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                            </div>

                            <h2 class="mb-2">Booking Confirmed!</h2>
                            <p class="text-muted mb-4">Your photography session has been successfully booked.</p>

                            <div class="alert alert-info mb-4">
                                <h6>Booking Reference</h6>
                                <p class="mb-0"><strong>#{{ $booking->id }}</strong></p>
                            </div>

                            <div class="table-responsive mb-4">
                                <table class="table table-borderless">
                                    <tr>
                                        <td><strong>Service:</strong></td>
                                        <td>{{ $booking->service->name }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Date & Time:</strong></td>
                                        <td>{{ $booking->booking_date->format('l, F d, Y h:i A') }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Duration:</strong></td>
                                        <td>{{ $booking->service->duration_minutes }} minutes</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Cost:</strong></td>
                                        <td class="text-success"><strong>${{ number_format($booking->total_cost, 2) }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td>
                                            <span class="badge bg-success">{{ ucfirst($booking->status) }}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            @if($booking->special_requests)
                                <div class="alert alert-light border">
                                    <h6>Special Requests</h6>
                                    <p class="mb-0">{{ $booking->special_requests }}</p>
                                </div>
                            @endif

                            <div class="mt-5 pt-3 border-top">
                                <p class="text-muted mb-3">A confirmation email has been sent to <strong>{{ $booking->customer_email }}</strong></p>
                                <a href="{{ route('bookings.show', $booking->id) }}" class="btn btn-primary">View Booking Details</a>
                                <a href="{{ route('home') }}" class="btn btn-outline-primary">Back to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

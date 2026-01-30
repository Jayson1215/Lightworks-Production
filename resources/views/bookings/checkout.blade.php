@extends('layouts.app')

@section('title', 'Checkout')

@section('content')
    <div class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="mb-4">Checkout</h2>

                            <div class="alert alert-success">
                                <h6>Booking Details</h6>
                                <table class="table table-sm mb-0">
                                    <tr>
                                        <td><strong>Service:</strong></td>
                                        <td>{{ $booking->service->name }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Date & Time:</strong></td>
                                        <td>{{ $booking->booking_date->format('M d, Y h:i A') }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Customer Name:</strong></td>
                                        <td>{{ $booking->customer_name }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td>{{ $booking->customer_email }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone:</strong></td>
                                        <td>{{ $booking->customer_phone }}</td>
                                    </tr>
                                </table>
                            </div>

                            <h5 class="mt-4 mb-3">Select Payment Method</h5>

                            <form action="{{ route('payments.store', $booking->id) }}" method="POST">
                                @csrf

                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="radio" name="payment_method" 
                                           id="payment_online" value="online" checked>
                                    <label class="form-check-label" for="payment_online">
                                        <strong>Pay Online Now</strong>
                                        <small class="d-block text-muted">Pay securely using Stripe card payment</small>
                                    </label>
                                </div>

                                <div class="form-check mb-4">
                                    <input class="form-check-input" type="radio" name="payment_method" 
                                           id="payment_inperson" value="in_person">
                                    <label class="form-check-label" for="payment_inperson">
                                        <strong>Pay In Person</strong>
                                        <small class="d-block text-muted">Pay on the day of your photography session</small>
                                    </label>
                                </div>

                                <button type="submit" class="btn btn-success btn-lg w-100">Proceed to Payment</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card sticky-top" style="top: 20px;">
                        <div class="card-body">
                            <h5 class="card-title">Order Summary</h5>
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
                                <h5 class="mb-0">Total:</h5>
                                <h4 class="text-success mb-0"><strong>${{ number_format($booking->total_cost, 2) }}</strong></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@extends('layouts.app')

@section('title', 'Book ' . $service->name)

@section('content')
    <div class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="mb-4">Book {{ $service->name }}</h2>

                            <form action="{{ route('bookings.store') }}" method="POST">
                                @csrf

                                <input type="hidden" name="service_id" value="{{ $service->id }}">

                                <!-- Service Info -->
                                <div class="alert alert-info">
                                    <h6>Service Details</h6>
                                    <p class="mb-0">
                                        <strong>{{ $service->name }}</strong> • 
                                        {{ $service->duration_minutes }} minutes • 
                                        <span class="text-success">${{ number_format($service->base_price, 2) }}</span>
                                    </p>
                                </div>

                                <!-- Customer Information -->
                                <h5 class="mt-4 mb-3">Your Information</h5>
                                
                                <div class="mb-3">
                                    <label for="customer_name" class="form-label">Full Name *</label>
                                    <input type="text" class="form-control @error('customer_name') is-invalid @enderror" 
                                           id="customer_name" name="customer_name" value="{{ old('customer_name', auth()->user()->name ?? '') }}" required>
                                    @error('customer_name')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="customer_email" class="form-label">Email Address *</label>
                                    <input type="email" class="form-control @error('customer_email') is-invalid @enderror" 
                                           id="customer_email" name="customer_email" value="{{ old('customer_email', auth()->user()->email ?? '') }}" required>
                                    @error('customer_email')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="customer_phone" class="form-label">Phone Number *</label>
                                    <input type="tel" class="form-control @error('customer_phone') is-invalid @enderror" 
                                           id="customer_phone" name="customer_phone" value="{{ old('customer_phone', auth()->user()->phone ?? '') }}" required>
                                    @error('customer_phone')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Booking Date -->
                                <h5 class="mt-4 mb-3">Select Date & Time</h5>
                                
                                <div class="mb-3">
                                    <label for="booking_date" class="form-label">Preferred Date & Time *</label>
                                    <input type="datetime-local" class="form-control @error('booking_date') is-invalid @enderror" 
                                           id="booking_date" name="booking_date" value="{{ old('booking_date') }}" required>
                                    <small class="text-muted">Choose a date and time for your session</small>
                                    @error('booking_date')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Add-ons -->
                                @if($addOns->count() > 0)
                                    <h5 class="mt-4 mb-3">Add-on Services</h5>
                                    
                                    <div class="mb-4">
                                        @foreach($addOns as $addOn)
                                            <div class="form-check mb-2">
                                                <input class="form-check-input" type="checkbox" 
                                                       id="addon_{{ $addOn->id }}" name="add_ons[]" value="{{ $addOn->id }}"
                                                       onchange="updateTotal()">
                                                <label class="form-check-label" for="addon_{{ $addOn->id }}">
                                                    {{ $addOn->name }} - <span class="text-success">${{ number_format($addOn->price, 2) }}</span>
                                                    <small class="d-block text-muted">{{ $addOn->description }}</small>
                                                </label>
                                            </div>
                                        @endforeach
                                    </div>
                                @endif

                                <!-- Special Requests -->
                                <h5 class="mt-4 mb-3">Special Requests</h5>
                                
                                <div class="mb-3">
                                    <label for="special_requests" class="form-label">Any Special Requests?</label>
                                    <textarea class="form-control" id="special_requests" name="special_requests" rows="4" 
                                              placeholder="Tell us about any special requests or preferences...">{{ old('special_requests') }}</textarea>
                                </div>

                                <button type="submit" class="btn btn-success btn-lg w-100">Continue to Checkout</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card sticky-top" style="top: 20px;">
                        <div class="card-body">
                            <h5 class="card-title">Booking Summary</h5>
                            <hr>
                            
                            <div class="mb-3">
                                <p class="text-muted mb-1">Service</p>
                                <h6>{{ $service->name }}</h6>
                            </div>

                            <div class="mb-3">
                                <p class="text-muted mb-1">Base Price</p>
                                <h6 class="text-success">${{ number_format($service->base_price, 2) }}</h6>
                            </div>

                            <div class="mb-3" id="addons_summary" style="display: none;">
                                <p class="text-muted mb-1">Add-ons</p>
                                <div id="addons_list"></div>
                            </div>

                            <hr>

                            <div class="mb-3">
                                <p class="text-muted mb-1">Total Cost</p>
                                <h5 class="text-success"><strong id="total_cost">${{ number_format($service->base_price, 2) }}</strong></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const basePrice = {{ $service->base_price }};
        const addOnPrices = {
            @foreach($addOns as $addon)
                {{ $addon->id }}: {{ $addon->price }},
            @endforeach
        };

        function updateTotal() {
            let total = basePrice;
            let selectedAddOns = [];
            let addOnsHtml = '';

            document.querySelectorAll('input[name="add_ons[]"]:checked').forEach(checkbox => {
                const id = checkbox.value;
                const price = addOnPrices[id];
                total += price;
                
                const label = checkbox.parentElement.textContent;
                const name = label.split(' - ')[0];
                addOnsHtml += `<div class="mb-2"><small>${name} <span class="text-success">+$${price.toFixed(2)}</span></small></div>`;
            });

            document.getElementById('total_cost').textContent = '$' + total.toFixed(2);
            
            if (addOnsHtml) {
                document.getElementById('addons_summary').style.display = 'block';
                document.getElementById('addons_list').innerHTML = addOnsHtml;
            } else {
                document.getElementById('addons_summary').style.display = 'none';
            }
        }
    </script>
@endsection

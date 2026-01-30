@extends('layouts.app')

@section('title', $service->name)

@section('content')
    <div class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="card mb-4">
                        <div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); height: 400px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-camera fa-5x text-white"></i>
                        </div>
                        <div class="card-body">
                            <h2>{{ $service->name }}</h2>
                            <p class="text-muted mb-3">Category: <strong>{{ $service->category }}</strong></p>
                            <p class="lead">{{ $service->description }}</p>
                            
                            @if($service->package_details)
                                <h5 class="mt-4">Package Details</h5>
                                <p>{{ $service->package_details }}</p>
                            @endif

                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <h6>Service Duration</h6>
                                    <p><strong>{{ $service->duration_minutes }} minutes</strong></p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Base Price</h6>
                                    <p class="text-success"><strong>${{ number_format($service->base_price, 2) }}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">Ready to Book?</h5>
                            <a href="{{ route('bookings.create', $service->id) }}" class="btn btn-success w-100">Book This Service</a>
                        </div>
                    </div>

                    @if($addOns->count() > 0)
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Add-on Services</h5>
                                <div class="list-group list-group-flush">
                                    @foreach($addOns as $addOn)
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-1">{{ $addOn->name }}</h6>
                                                <small class="text-muted">{{ $addOn->description }}</small>
                                            </div>
                                            <span class="badge bg-success">${{ number_format($addOn->price, 2) }}</span>
                                        </div>
                                    @endforeach
                                </div>
                                <small class="text-muted mt-2 d-block">Add these during booking for additional cost</small>
                            </div>
                        </div>
                    @endif

                    @if($relatedServices->count() > 0)
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Similar Services</h5>
                                <div class="list-group list-group-flush">
                                    @foreach($relatedServices as $related)
                                        <a href="{{ route('services.show', $related->id) }}" class="list-group-item list-group-item-action">
                                            {{ $related->name }}
                                            <small class="text-success d-block">${{ number_format($related->base_price, 2) }}</small>
                                        </a>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <div class="mt-5 text-center">
                <a href="{{ route('services.index') }}" class="btn btn-outline-primary">Back to Services</a>
            </div>
        </div>
    </div>
@endsection

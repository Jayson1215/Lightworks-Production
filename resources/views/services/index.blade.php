@extends('layouts.app')

@section('title', 'Services')

@section('content')
    <div class="py-5">
        <div class="container">
            <h1 class="section-title text-center mb-5">Our Photography Services</h1>

            <div class="row g-4">
                @forelse($services as $service)
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100">
                            <div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); height: 200px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-camera fa-4x text-white"></i>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ $service->name }}</h5>
                                <span class="badge bg-primary mb-2" style="width: fit-content;">{{ $service->category }}</span>
                                <p class="card-text flex-grow-1">{{ Str::limit($service->description, 100) }}</p>
                                <div class="mb-3">
                                    <p class="text-muted"><small>Duration: {{ $service->duration_minutes }} minutes</small></p>
                                    <h6 class="text-success"><strong>${{ number_format($service->base_price, 2) }}</strong></h6>
                                </div>
                                <a href="{{ route('services.show', $service->id) }}" class="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="alert alert-info text-center">
                            <p>No services available at the moment.</p>
                        </div>
                    </div>
                @endforelse
            </div>

            @if($services->hasPages())
                <div class="mt-5">
                    {{ $services->links('pagination::bootstrap-5') }}
                </div>
            @endif
        </div>
    </div>
@endsection

@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <h1>Capture Your Moments</h1>
            <p class="lead mb-4">Professional Photography Services for All Occasions</p>
            <a href="{{ route('services.index') }}" class="btn btn-light btn-lg">Book Now</a>
        </div>
    </section>

    <!-- Featured Services -->
    <section class="py-5">
        <div class="container">
            <h2 class="section-title text-center">Our Services</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card service-card">
                        <i class="fas fa-portrait fa-3x mb-3" style="color: var(--primary-color);"></i>
                        <h5>Portrait Photography</h5>
                        <p>Professional portraits for individuals and families</p>
                        <a href="{{ route('services.index') }}" class="btn-book">Learn More</a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card service-card">
                        <i class="fas fa-ring fa-3x mb-3" style="color: var(--primary-color);"></i>
                        <h5>Wedding Photography</h5>
                        <p>Capture your special day with stunning imagery</p>
                        <a href="{{ route('services.index') }}" class="btn-book">Learn More</a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card service-card">
                        <i class="fas fa-camera fa-3x mb-3" style="color: var(--primary-color);"></i>
                        <h5>Event Photography</h5>
                        <p>Professional coverage for corporate and private events</p>
                        <a href="{{ route('services.index') }}" class="btn-book">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Portfolio -->
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center">Featured Works</h2>
            <div class="row g-4">
                <div class="col-md-3">
                    <div class="card">
                        <div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); height: 250px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-images fa-4x text-white"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Portrait Gallery</h5>
                            <p class="card-text">Beautiful portrait photography</p>
                            <a href="{{ route('portfolio.index') }}" class="btn btn-sm btn-primary">View</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card">
                        <div style="background: linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%); height: 250px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-images fa-4x text-white"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Wedding Collection</h5>
                            <p class="card-text">Romantic wedding moments</p>
                            <a href="{{ route('portfolio.index') }}" class="btn btn-sm btn-primary">View</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card">
                        <div style="background: linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%); height: 250px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-images fa-4x text-white"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Event Photos</h5>
                            <p class="card-text">Memorable event coverage</p>
                            <a href="{{ route('portfolio.index') }}" class="btn btn-sm btn-primary">View</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card">
                        <div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%); height: 250px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-images fa-4x text-white"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Product Photos</h5>
                            <p class="card-text">Professional product photography</p>
                            <a href="{{ route('portfolio.index') }}" class="btn btn-sm btn-primary">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); color: white;">
        <div class="container text-center">
            <h2 class="mb-4">Ready to Book Your Session?</h2>
            <p class="lead mb-4">Check out our services and book your perfect photography session today</p>
            <a href="{{ route('services.index') }}" class="btn btn-light btn-lg">Browse Services</a>
        </div>
    </section>
@endsection

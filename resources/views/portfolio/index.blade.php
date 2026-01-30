@extends('layouts.app')

@section('title', 'Portfolio')

@section('content')
    <div class="py-5">
        <div class="container">
            <h1 class="section-title text-center mb-5">Our Portfolio</h1>

            @if($categories->count() > 0)
                <div class="mb-4 text-center">
                    <a href="{{ route('portfolio.index') }}" class="btn btn-sm btn-outline-primary">All</a>
                    @foreach($categories as $category)
                        <a href="{{ route('portfolio.category', $category) }}" class="btn btn-sm btn-outline-primary">{{ $category }}</a>
                    @endforeach
                </div>
            @endif

            <div class="row g-4">
                @forelse($portfolios as $item)
                    <div class="col-md-4 col-lg-3">
                        <div class="card">
                            <div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); height: 250px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                @if($item->image_path)
                                    <img src="{{ asset('storage/' . $item->image_path) }}" alt="{{ $item->title }}" style="width: 100%; height: 100%; object-fit: cover;">
                                @else
                                    <i class="fas fa-image fa-3x text-white"></i>
                                @endif
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{ $item->title }}</h5>
                                <p class="card-text text-muted">{{ Str::limit($item->description, 60) }}</p>
                                <span class="badge bg-primary mb-2">{{ $item->category }}</span>
                                <br>
                                <a href="{{ route('portfolio.show', $item->id) }}" class="btn btn-sm btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="alert alert-info text-center">
                            <p>No portfolio items found. Check back soon!</p>
                        </div>
                    </div>
                @endforelse
            </div>
        </div>
    </div>
@endsection

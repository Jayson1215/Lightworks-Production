@extends('layouts.app')

@section('title', 'Portfolio Details')

@section('content')
    <div class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); height: 400px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                            @if($portfolio->image_path)
                                <img src="{{ asset('storage/' . $portfolio->image_path) }}" alt="{{ $portfolio->title }}" style="width: 100%; height: 100%; object-fit: cover;">
                            @else
                                <i class="fas fa-image fa-5x text-white"></i>
                            @endif
                        </div>
                        <div class="card-body">
                            <h2>{{ $portfolio->title }}</h2>
                            <p class="text-muted">Category: <strong>{{ $portfolio->category }}</strong></p>
                            <p class="lead">{{ $portfolio->description }}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">About This Work</h5>
                            <p class="card-text">
                                This is a beautiful example of our {{ $portfolio->category }} photography. 
                                We specialize in capturing moments that matter most.
                            </p>
                            <a href="{{ route('services.index') }}" class="btn btn-primary w-100">Book Similar Session</a>
                        </div>
                    </div>

                    @if($relatedPortfolios->count() > 0)
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Related Works</h5>
                                <div class="list-group list-group-flush">
                                    @foreach($relatedPortfolios as $related)
                                        <a href="{{ route('portfolio.show', $related->id) }}" class="list-group-item list-group-item-action">
                                            {{ $related->title }}
                                            <small class="text-muted d-block">{{ $related->category }}</small>
                                        </a>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <div class="mt-5 text-center">
                <a href="{{ route('portfolio.index') }}" class="btn btn-outline-primary">Back to Portfolio</a>
            </div>
        </div>
    </div>
@endsection

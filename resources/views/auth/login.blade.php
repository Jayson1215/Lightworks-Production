@extends('layouts.app')

@section('title', 'Login')

@section('content')
    <div class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body p-5">
                            <h2 class="text-center mb-4">Login to Your Account</h2>

                            <form method="POST" action="{{ route('login') }}">
                                @csrf

                                <div class="mb-3">
                                    <label for="email" class="form-label">Email Address *</label>
                                    <input type="email" class="form-control @error('email') is-invalid @enderror" 
                                           id="email" name="email" value="{{ old('email') }}" required autofocus>
                                    @error('email')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="mb-4">
                                    <label for="password" class="form-label">Password *</label>
                                    <input type="password" class="form-control @error('password') is-invalid @enderror" 
                                           id="password" name="password" required>
                                    @error('password')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="remember" name="remember">
                                    <label class="form-check-label" for="remember">Remember me</label>
                                </div>

                                <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
                            </form>

                            <hr>

                            <p class="text-center text-muted">
                                Don't have an account? 
                                <a href="{{ route('register') }}">Register here</a>
                            </p>
                        </div>
                    </div>

                    <div class="alert alert-info mt-3">
                        <small>
                            <strong>Demo Admin Account:</strong><br>
                            Email: admin@photography.com<br>
                            Password: admin123456
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

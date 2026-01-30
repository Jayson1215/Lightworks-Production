<?php

use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Auth Routes
Route::post('login', [ApiAuthController::class, 'login']);
Route::post('register', [ApiAuthController::class, 'register']);

// Portfolio API Routes
Route::get('portfolios', [PortfolioController::class, 'index']);
Route::get('portfolios/{id}', [PortfolioController::class, 'show']);
Route::get('portfolios/category/{category}', [PortfolioController::class, 'byCategory']);

// Services API Routes
Route::get('services', [ServiceController::class, 'index']);
Route::get('services/{id}', [ServiceController::class, 'show']);
Route::get('services/{id}/availability', [ServiceController::class, 'getAvailability']);

// Protected Routes (requires authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth Routes
    Route::post('logout', [ApiAuthController::class, 'logout']);
    Route::get('me', [ApiAuthController::class, 'me']);

    // Bookings
    Route::get('bookings', [BookingController::class, 'index']);
    Route::get('bookings/{id}', [BookingController::class, 'show']);
    Route::post('bookings', [BookingController::class, 'store']);
    Route::put('bookings/{id}', [BookingController::class, 'update']);
    Route::delete('bookings/{id}', [BookingController::class, 'destroy']);
});

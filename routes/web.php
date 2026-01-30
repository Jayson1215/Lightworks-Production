<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\ApiAuthController;
use Illuminate\Support\Facades\Route;

// API Routes - must be defined before fallback
Route::prefix('api')->group(function () {
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
});

// Serve React App for all non-API routes
Route::get('/', function () {
    return view('app');
})->name('home');

// Catch-all route for React - but NOT for /api routes
Route::fallback(function () {
    return view('app');
});

// Portfolio Routes
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/portfolio/{id}', [PortfolioController::class, 'show'])->name('portfolio.show');
Route::get('/portfolio/category/{category}', [PortfolioController::class, 'byCategory'])->name('portfolio.category');

// Services Routes
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{id}', [ServiceController::class, 'show'])->name('services.show');
Route::get('/services/{id}/availability', [ServiceController::class, 'getAvailability'])->name('services.availability');

// Auth Routes
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

// Booking Routes
Route::middleware('auth')->group(function () {
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{id}', [BookingController::class, 'show'])->name('bookings.show');
    Route::get('/bookings/{id}/edit', [BookingController::class, 'edit'])->name('bookings.edit');
    Route::put('/bookings/{id}', [BookingController::class, 'update'])->name('bookings.update');
    Route::delete('/bookings/{id}', [BookingController::class, 'cancel'])->name('bookings.cancel');
});

// Booking Routes (Guest/Auth)
Route::get('/bookings/create/{serviceId}', [BookingController::class, 'create'])->name('bookings.create');
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{id}/checkout', [BookingController::class, 'checkout'])->name('bookings.checkout');

// Payment Routes
Route::post('/payments/{bookingId}', [PaymentController::class, 'store'])->name('payments.store');
Route::get('/payments/stripe/{paymentId}', [PaymentController::class, 'stripeCheckout'])->name('payments.stripe');
Route::get('/payments/success/{paymentId}', [PaymentController::class, 'stripeSuccess'])->name('payments.success');
Route::get('/payments/failed/{paymentId}', [PaymentController::class, 'stripeFailed'])->name('payments.failed');
Route::get('/bookings/{id}/confirmation', [PaymentController::class, 'confirmation'])->name('bookings.confirmation');

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Services
    Route::get('/services', [AdminController::class, 'servicesIndex'])->name('services.index');
    Route::get('/services/create', [AdminController::class, 'servicesCreate'])->name('services.create');
    Route::post('/services', [AdminController::class, 'servicesStore'])->name('services.store');
    Route::get('/services/{id}/edit', [AdminController::class, 'servicesEdit'])->name('services.edit');
    Route::put('/services/{id}', [AdminController::class, 'servicesUpdate'])->name('services.update');
    Route::delete('/services/{id}', [AdminController::class, 'servicesDestroy'])->name('services.destroy');
    
    // Portfolio
    Route::get('/portfolio', [AdminController::class, 'portfolioIndex'])->name('portfolio.index');
    Route::get('/portfolio/create', [AdminController::class, 'portfolioCreate'])->name('portfolio.create');
    Route::post('/portfolio', [AdminController::class, 'portfolioStore'])->name('portfolio.store');
    Route::get('/portfolio/{id}/edit', [AdminController::class, 'portfolioEdit'])->name('portfolio.edit');
    Route::put('/portfolio/{id}', [AdminController::class, 'portfolioUpdate'])->name('portfolio.update');
    Route::delete('/portfolio/{id}', [AdminController::class, 'portfolioDestroy'])->name('portfolio.destroy');
    
    // Bookings
    Route::get('/bookings', [AdminController::class, 'bookingsIndex'])->name('bookings.index');
    Route::get('/bookings/{id}', [AdminController::class, 'bookingsShow'])->name('bookings.show');
    Route::put('/bookings/{id}/status', [AdminController::class, 'bookingsUpdateStatus'])->name('bookings.update-status');
    
    // Add-ons
    Route::get('/add-ons', [AdminController::class, 'addOnsIndex'])->name('add-ons.index');
    Route::get('/add-ons/create', [AdminController::class, 'addOnsCreate'])->name('add-ons.create');
    Route::post('/add-ons', [AdminController::class, 'addOnsStore'])->name('add-ons.store');
    
    // Reports
    Route::get('/reports', [AdminController::class, 'reports'])->name('reports');
});

require __DIR__.'/auth.php';

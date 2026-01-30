<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request, $bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        
        $validated = $request->validate([
            'payment_method' => 'required|in:online,in_person',
        ]);

        $payment = Payment::create([
            'booking_id' => $bookingId,
            'payment_method' => $validated['payment_method'],
            'amount' => $booking->total_cost,
            'status' => $validated['payment_method'] === 'in_person' ? 'pending' : 'pending',
        ]);

        if ($validated['payment_method'] === 'online') {
            return redirect()->route('payments.stripe', $payment->id);
        }

        $booking->status = 'confirmed';
        $booking->save();

        return redirect()->route('bookings.confirmation', $bookingId)
            ->with('success', 'Booking confirmed! Payment will be collected in person.');
    }

    public function stripeCheckout($paymentId)
    {
        $payment = Payment::findOrFail($paymentId);
        return view('payments.stripe', compact('payment'));
    }

    public function stripeSuccess(Request $request, $paymentId)
    {
        $payment = Payment::findOrFail($paymentId);
        $payment->status = 'completed';
        $payment->transaction_id = $request->session_id ?? null;
        $payment->save();

        $payment->booking->status = 'confirmed';
        $payment->booking->save();

        return redirect()->route('bookings.confirmation', $payment->booking_id)
            ->with('success', 'Payment successful! Your booking is confirmed.');
    }

    public function stripeFailed($paymentId)
    {
        $payment = Payment::findOrFail($paymentId);
        return redirect()->route('payments.stripe', $paymentId)
            ->with('error', 'Payment failed. Please try again.');
    }

    public function confirmation($bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        return view('bookings.confirmation', compact('booking'));
    }
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookingCheckout() {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardData, setCardData] = useState({
    cardholder_name: '',
    card_number: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooking(response.data.data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      alert('Booking not found');
      navigate('/bookings');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const paymentData = {
        booking_id: bookingId,
        payment_method: paymentMethod,
        ...(paymentMethod === 'credit_card' && {
          card_holder: cardData.cardholder_name,
          card_number: cardData.card_number,
          expiry: cardData.expiry,
          cvv: cardData.cvv
        })
      };

      const response = await axios.post('/api/bookings/pay', paymentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate(`/bookings/${bookingId}/confirmation`, {
        state: { paymentId: response.data.payment_id }
      });
    } catch (error) {
      alert('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading...</p></div>;
  if (!booking) return <div className="container mt-5"><p className="text-center">Booking not found</p></div>;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="section-title mb-5">Checkout</h1>

        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <p>{booking.service?.name}</p>
              <p>${booking.base_price}</p>
            </div>
            {booking.add_ons && booking.add_ons.length > 0 && (
              <>
                <div className="summary-divider"></div>
                <h5>Add-ons</h5>
                {booking.add_ons.map(addon => (
                  <div key={addon.id} className="summary-item">
                    <p>{addon.name}</p>
                    <p>${addon.price}</p>
                  </div>
                ))}
              </>
            )}
            <div className="summary-divider"></div>
            <div className="summary-total">
              <h5>Total</h5>
              <h4>${booking.total_price}</h4>
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form">
            <h3>Payment Details</h3>
            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-control"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {paymentMethod === 'credit_card' && (
                <>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholder_name"
                      value={cardData.cardholder_name}
                      onChange={handlePaymentChange}
                      className="form-control"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="card_number"
                      value={cardData.card_number}
                      onChange={handlePaymentChange}
                      className="form-control"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handlePaymentChange}
                        className="form-control"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handlePaymentChange}
                        className="form-control"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100"
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay $${booking.total_price}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

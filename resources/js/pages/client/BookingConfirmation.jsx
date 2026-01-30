import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function BookingConfirmation() {
  const { id: bookingId } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading...</p></div>;
  if (!booking) return <div className="container mt-5"><p className="text-center">Booking not found</p></div>;

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header text-center">
            <i className="fas fa-check-circle"></i>
            <h1>Booking Confirmed!</h1>
            <p>Your booking has been successfully confirmed.</p>
          </div>

          <div className="confirmation-content">
            <h3>Booking Details</h3>
            <div className="detail-group">
              <p><strong>Booking ID:</strong> #{booking.id}</p>
              <p><strong>Service:</strong> {booking.service?.name}</p>
              <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {booking.booking_time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Duration:</strong> {booking.duration} hours</p>
            </div>

            <div className="detail-group">
              <h4>Total Amount Paid: ${booking.total_price}</h4>
              <p className="text-muted">Payment ID: {location.state?.paymentId || 'N/A'}</p>
            </div>

            <div className="confirmation-message">
              <p>A confirmation email has been sent to your registered email address.</p>
              <p>You can reschedule or cancel your booking from your account dashboard.</p>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/bookings" className="btn btn-primary">
              View All Bookings
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Book Another Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

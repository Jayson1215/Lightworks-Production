import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(`/api/bookings/${bookingId}/cancel`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMyBookings();
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'success',
      completed: 'info',
      cancelled: 'danger'
    };
    return colors[status] || 'secondary';
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading your bookings...</p></div>;

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1 className="section-title mb-5">My Bookings</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h5>{booking.service?.name}</h5>
                  <span className={`badge badge-${getStatusBadge(booking.status)}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>
                <div className="booking-details">
                  <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {booking.booking_time}</p>
                  <p><strong>Location:</strong> {booking.location}</p>
                  <p><strong>Duration:</strong> {booking.duration} hours</p>
                  <p><strong>Price:</strong> ${booking.total_price}</p>
                </div>
                <div className="booking-actions">
                  <Link to={`/bookings/${booking.id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                  {booking.status === 'pending' && (
                    <button 
                      onClick={() => handleCancel(booking.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <p className="text-center">You don't have any bookings yet.</p>
            <div className="text-center mt-3">
              <Link to="/services" className="btn btn-primary">
                Browse Services
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

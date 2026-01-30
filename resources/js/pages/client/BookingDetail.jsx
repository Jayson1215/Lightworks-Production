import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    booking_date: '',
    booking_time: ''
  });

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooking(response.data.data);
      setRescheduleData({
        booking_date: response.data.data.booking_date,
        booking_time: response.data.data.booking_time
      });
    } catch (error) {
      console.error('Error fetching booking:', error);
      alert('Booking not found');
      navigate('/bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/bookings/${id}/reschedule`, rescheduleData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Booking rescheduled successfully!');
      setShowRescheduleForm(false);
      fetchBookingDetails();
    } catch (error) {
      alert('Failed to reschedule booking');
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading...</p></div>;
  if (!booking) return <div className="container mt-5"><p className="text-center">Booking not found</p></div>;

  return (
    <div className="booking-detail-page">
      <div className="container">
        <Link to="/bookings" className="back-link">← Back to My Bookings</Link>

        <h1 className="section-title mb-5">Booking Details</h1>

        <div className="booking-detail-grid">
          <div className="booking-detail-card">
            <h3>Service Information</h3>
            <p><strong>Service:</strong> {booking.service?.name}</p>
            <p><strong>Category:</strong> {booking.service?.category}</p>
            <p><strong>Base Price:</strong> ${booking.base_price}</p>
            {booking.add_ons && booking.add_ons.length > 0 && (
              <>
                <p><strong>Add-ons:</strong></p>
                <ul>
                  {booking.add_ons.map(addon => (
                    <li key={addon.id}>{addon.name} - ${addon.price}</li>
                  ))}
                </ul>
              </>
            )}
            <p><strong>Total Price:</strong> ${booking.total_price}</p>
          </div>

          <div className="booking-detail-card">
            <h3>Booking Information</h3>
            <p><strong>Booking ID:</strong> #{booking.id}</p>
            <p><strong>Status:</strong> <span className="badge badge-success">{booking.status.toUpperCase()}</span></p>
            <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
            <p><strong>Booking Time:</strong> {booking.booking_time}</p>
            <p><strong>Location:</strong> {booking.location}</p>
            <p><strong>Duration:</strong> {booking.duration} hours</p>
            {booking.notes && (
              <p><strong>Notes:</strong> {booking.notes}</p>
            )}
          </div>

          <div className="booking-detail-card">
            <h3>Payment Information</h3>
            <p><strong>Payment Status:</strong> <span className="badge badge-success">PAID</span></p>
            <p><strong>Payment Date:</strong> {new Date(booking.paid_at).toLocaleDateString()}</p>
            <p><strong>Amount Paid:</strong> ${booking.total_price}</p>
          </div>
        </div>

        <div className="booking-actions mt-5">
          {booking.status === 'pending' || booking.status === 'confirmed' ? (
            <>
              <button 
                onClick={() => setShowRescheduleForm(!showRescheduleForm)}
                className="btn btn-warning"
              >
                <i className="fas fa-calendar-alt"></i> Reschedule
              </button>
            </>
          ) : null}
        </div>

        {showRescheduleForm && (
          <div className="reschedule-form mt-5">
            <h3>Reschedule Booking</h3>
            <form onSubmit={handleReschedule}>
              <div className="form-group">
                <label>New Date</label>
                <input
                  type="date"
                  value={rescheduleData.booking_date}
                  onChange={(e) => setRescheduleData({
                    ...rescheduleData,
                    booking_date: e.target.value
                  })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>New Time</label>
                <input
                  type="time"
                  value={rescheduleData.booking_time}
                  onChange={(e) => setRescheduleData({
                    ...rescheduleData,
                    booking_time: e.target.value
                  })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Confirm Reschedule
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowRescheduleForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

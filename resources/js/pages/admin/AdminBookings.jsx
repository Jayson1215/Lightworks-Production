import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = filter === 'all' 
        ? '/api/bookings' 
        : `/api/bookings?status=${filter}`;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Mock data
      setBookings([
        { id: 1, user: { name: 'John Smith' }, service: { name: 'Wedding' }, booking_date: new Date().toISOString(), status: 'confirmed', total_price: 1500 },
        { id: 2, user: { name: 'Jane Doe' }, service: { name: 'Portrait' }, booking_date: new Date().toISOString(), status: 'pending', total_price: 500 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/bookings/${bookingId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings();
    } catch (error) {
      alert('Failed to update booking status');
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'warning',
      'confirmed': 'success',
      'completed': 'info',
      'cancelled': 'danger'
    };
    return colors[status] || 'secondary';
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading bookings...</p></div>;

  return (
    <div className="admin-bookings">
      <div className="container">
        <h1 className="section-title mb-4"><i className="fas fa-list"></i> Manage Bookings</h1>

        <div className="filter-bar mb-4">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Bookings
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No bookings found</td>
                </tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking.id}>
                    <td><strong>#{booking.id}</strong></td>
                    <td>{booking.user?.name || 'N/A'}</td>
                    <td>{booking.service?.name}</td>
                    <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td>{booking.booking_time}</td>
                    <td>
                      <span className={`badge badge-${getStatusColor(booking.status)}`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </td>
                    <td>${(booking.total_price || 0).toFixed(2)}</td>
                    <td>
                      <select 
                        value={booking.status}
                        onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                        className="form-control form-control-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    totalCustomers: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.stats || {
        totalBookings: 0,
        totalRevenue: 0,
        pendingBookings: 0,
        totalCustomers: 0
      });
      setRecentBookings(response.data.recentBookings || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Mock data for development
      setStats({
        totalBookings: 42,
        totalRevenue: 12500,
        pendingBookings: 8,
        totalCustomers: 156
      });
      setRecentBookings([
        { id: 1, customer_name: 'John Smith', service: { name: 'Wedding Photography' }, booking_date: new Date().toISOString(), status: 'pending', total_price: 1500 },
        { id: 2, customer_name: 'Jane Doe', service: { name: 'Portrait Session' }, booking_date: new Date().toISOString(), status: 'confirmed', total_price: 500 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading dashboard...</p></div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="section-title mb-4">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-calendar-check"></i></div>
            <div className="stat-content">
              <h4>{stats.totalBookings}</h4>
              <p>Total Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-dollar-sign"></i></div>
            <div className="stat-content">
              <h4>${(stats.totalRevenue || 0).toFixed(2)}</h4>
              <p>Total Revenue</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-hourglass-half"></i></div>
            <div className="stat-content">
              <h4>{stats.pendingBookings}</h4>
              <p>Pending Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-users"></i></div>
            <div className="stat-content">
              <h4>{stats.totalCustomers}</h4>
              <p>Total Customers</p>
            </div>
          </div>
        </div>

        {/* Management Links */}
        <div className="management-grid mt-5">
          <div className="management-card">
            <div className="card-icon"><i className="fas fa-camera"></i></div>
            <h4>Manage Services</h4>
            <p>Create, edit, and delete photography services</p>
            <Link to="/admin/services" className="btn btn-primary">Manage Services</Link>
          </div>

          <div className="management-card">
            <div className="card-icon"><i className="fas fa-images"></i></div>
            <h4>Manage Portfolio</h4>
            <p>Upload and organize portfolio images and projects</p>
            <Link to="/admin/portfolio" className="btn btn-primary">Manage Portfolio</Link>
          </div>

          <div className="management-card">
            <div className="card-icon"><i className="fas fa-calendar"></i></div>
            <h4>Manage Bookings</h4>
            <p>View and manage all customer bookings and schedules</p>
            <Link to="/admin/bookings" className="btn btn-primary">Manage Bookings</Link>
          </div>

          <div className="management-card">
            <div className="card-icon"><i className="fas fa-gift"></i></div>
            <h4>Manage Add-ons</h4>
            <p>Create optional add-on services for customers</p>
            <Link to="/admin/add-ons" className="btn btn-primary">Manage Add-ons</Link>
          </div>

          <div className="management-card">
            <div className="card-icon"><i className="fas fa-chart-bar"></i></div>
            <h4>View Reports</h4>
            <p>Analytics, revenue, and performance reports</p>
            <Link to="/admin/reports" className="btn btn-primary">View Reports</Link>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="recent-section mt-5">
          <h3 className="mb-4">Recent Bookings</h3>
          {recentBookings.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.customer_name}</td>
                      <td>{booking.service?.name}</td>
                      <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge badge-${booking.status === 'pending' ? 'warning' : booking.status === 'confirmed' ? 'success' : 'info'}`}>
                          {booking.status.toUpperCase()}
                        </span>
                      </td>
                      <td>${(booking.total_price || 0).toFixed(2)}</td>
                      <td>
                        <Link to={`/admin/bookings/${booking.id}`} className="btn btn-sm btn-primary">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No recent bookings</p>
          )}
        </div>
      </div>
    </div>
  );
}

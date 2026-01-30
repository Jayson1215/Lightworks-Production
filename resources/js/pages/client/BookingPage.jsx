import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    duration: '2',
    location: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await axios.get(`/api/services/${serviceId}`);
      setService(response.data.data);
    } catch (error) {
      console.error('Error fetching service:', error);
      alert('Service not found');
      navigate('/services');
    } finally {
      setServiceLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/bookings', {
        service_id: serviceId,
        ...formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate(`/bookings/${response.data.data.id}/checkout`);
    } catch (error) {
      alert('Failed to create booking. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (serviceLoading) return <div className="container mt-5"><p className="text-center">Loading service...</p></div>;
  if (!service) return <div className="container mt-5"><p className="text-center">Service not found</p></div>;

  const estimatedPrice = (service.base_price || 0) * (parseInt(formData.duration) || 1);

  return (
    <div className="booking-page">
      <div className="container">
        <Link to="/services" className="back-link">← Back to Services</Link>
        
        <h1 className="section-title mb-5"><i className="fas fa-calendar"></i> Create Booking</h1>
        
        <div className="booking-form-container">
          <div className="booking-form">
            <h2>Service Booking Form</h2>
            <p className="service-name">Service: <strong>{service.name}</strong></p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="booking_date">Preferred Date <span className="required">*</span></label>
                <input
                  type="date"
                  id="booking_date"
                  name="booking_date"
                  value={formData.booking_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="booking_time">Preferred Time <span className="required">*</span></label>
                <input
                  type="time"
                  id="booking_time"
                  name="booking_time"
                  value={formData.booking_time}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (hours) <span className="required">*</span></label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="3">3 Hours</option>
                  <option value="4">4 Hours</option>
                  <option value="8">Full Day (8 Hours)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location <span className="required">*</span></label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Where will the photoshoot be?"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Special Requests</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special requirements or requests?"
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Processing...' : 'Continue to Checkout'}
              </button>
            </form>
          </div>

          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-section">
              <h5>Service Details</h5>
              <div className="summary-item">
                <span>Service:</span>
                <strong>{service.name}</strong>
              </div>
              <div className="summary-item">
                <span>Base Price:</span>
                <strong>${service.base_price}</strong>
              </div>
            </div>

            <div className="summary-section">
              <h5>Booking Details</h5>
              <div className="summary-item">
                <span>Date:</span>
                <strong>{formData.booking_date || 'Not selected'}</strong>
              </div>
              <div className="summary-item">
                <span>Time:</span>
                <strong>{formData.booking_time || 'Not selected'}</strong>
              </div>
              <div className="summary-item">
                <span>Duration:</span>
                <strong>{formData.duration} hours</strong>
              </div>
              <div className="summary-item">
                <span>Location:</span>
                <strong>{formData.location || 'Not specified'}</strong>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-section">
              <div className="summary-total">
                <span>Estimated Price:</span>
                <h4>${estimatedPrice.toFixed(2)}</h4>
              </div>
              <p className="text-muted">Final price may vary based on add-ons selected at checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

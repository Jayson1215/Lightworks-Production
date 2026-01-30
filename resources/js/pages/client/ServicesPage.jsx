import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Mock data for development
      setServices([
        { id: 1, name: 'Portrait Photography', description: 'Professional portraits for individuals and families', category: 'portrait', base_price: 300, duration: 2 },
        { id: 2, name: 'Wedding Photography', description: 'Capture your special day with stunning imagery', category: 'wedding', base_price: 2000, duration: 8 },
        { id: 3, name: 'Event Photography', description: 'Professional coverage for corporate events and celebrations', category: 'event', base_price: 800, duration: 4 },
        { id: 4, name: 'Product Photography', description: 'Professional product photography for businesses', category: 'product', base_price: 500, duration: 3 },
        { id: 5, name: 'Family Session', description: 'Create lasting memories with your family', category: 'portrait', base_price: 400, duration: 2 },
        { id: 6, name: 'Real Estate Photography', description: 'Showcase properties with professional photography', category: 'product', base_price: 600, duration: 3 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center"><p>Loading services...</p></div>;
  }

  return (
    <div className="services-page">
      <div className="container">
        <h1 className="section-title text-center mb-2">Our Services</h1>
        <p className="text-center" style={{color: '#666', marginBottom: '50px'}}>Professional photography services tailored to your needs</p>

        <div className="services-grid">
        {services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className="service-item">
              <div className="service-header">
                <h4>{service.name}</h4>
                <span className="service-category">{service.category}</span>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-footer">
                <div className="service-price">
                  <span className="label">From</span>
                  <span className="price">${service.base_price}</span>
                </div>
                <Link to={`/services/${service.id}`} className="btn btn-primary">
                  View Details <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No services available.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

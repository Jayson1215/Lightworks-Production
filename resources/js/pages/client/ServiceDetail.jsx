import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [addOns, setAddOns] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/api/services/${id}`);
      setService(response.data.data);
      setAddOns(response.data.data.add_ons || []);
    } catch (error) {
      console.error('Error fetching service:', error);
      // Mock data for development
      const mockServices = {
        1: { id: 1, name: 'Portrait Photography', description: 'Professional portraits for individuals and families', category: 'portrait', base_price: 300, duration: 2, add_ons: [] },
        2: { id: 2, name: 'Wedding Photography', description: 'Capture your special day with stunning imagery', category: 'wedding', base_price: 2000, duration: 8, add_ons: [] },
        3: { id: 3, name: 'Event Photography', description: 'Professional coverage for corporate events and celebrations', category: 'event', base_price: 800, duration: 4, add_ons: [] },
        4: { id: 4, name: 'Product Photography', description: 'Professional product photography for businesses', category: 'product', base_price: 500, duration: 3, add_ons: [] },
        5: { id: 5, name: 'Family Session', description: 'Create lasting memories with your family', category: 'portrait', base_price: 400, duration: 2, add_ons: [] },
        6: { id: 6, name: 'Real Estate Photography', description: 'Showcase properties with professional photography', category: 'product', base_price: 600, duration: 3, add_ons: [] }
      };
      const mockService = mockServices[id];
      if (mockService) {
        setService(mockService);
        setAddOns(mockService.add_ons || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddOnChange = (addOnId) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBookNow = () => {
    navigate(`/bookings/create/${id}`, {
      state: { selectedAddOns }
    });
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading service details...</p></div>;
  if (!service) return (
    <div className="container mt-5" style={{ textAlign: 'center' }}>
      <h2>Service Not Found</h2>
      <p className="text-muted">The service you're looking for doesn't exist.</p>
      <Link to="/services" className="btn btn-primary">Back to Services</Link>
    </div>
  );

  const totalPrice = (service.base_price || 0) + 
    selectedAddOns.reduce((sum, id) => {
      const addon = addOns.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

  return (
    <div className="service-detail-page">
      <div className="container">
        <Link to="/services" className="back-link">← Back to Services</Link>

        <div className="service-detail-grid">
          <div className="service-detail-main">
            <h1>{service.name}</h1>
            <p className="category-badge">{service.category}</p>
            
            <div className="service-image">
              <i className="fas fa-image"></i>
            </div>

            <div className="service-description">
              <h3>About This Service</h3>
              <p>{service.description}</p>
            </div>

            <div className="service-features">
              <h3>What's Included</h3>
              <ul>
                <li><i className="fas fa-check"></i> Professional Photography</li>
                <li><i className="fas fa-check"></i> Digital Copies</li>
                <li><i className="fas fa-check"></i> Basic Editing</li>
                <li><i className="fas fa-check"></i> {service.duration || '2'} hours coverage</li>
              </ul>
            </div>
          </div>

          <div className="service-detail-sidebar">
            <div className="price-card">
              <h3>Pricing</h3>
              <div className="base-price">
                <p>Base Price</p>
                <h2>${service.base_price}</h2>
              </div>

              {addOns.length > 0 && (
                <div className="add-ons-section">
                  <h4>Add-ons</h4>
                  {addOns.map(addon => (
                    <div key={addon.id} className="add-on-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addon.id)}
                          onChange={() => handleAddOnChange(addon.id)}
                        />
                        <span>{addon.name} <strong>+${addon.price}</strong></span>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              <div className="price-divider"></div>
              
              <div className="total-price">
                <p>Total Price</p>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>

              <button 
                onClick={handleBookNow}
                className="btn btn-primary btn-lg w-100"
              >
                Book Now
              </button>
            </div>

            <div className="service-info-card">
              <h4>Service Information</h4>
              <p><strong>Duration:</strong> {service.duration || '2'} hours</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Availability:</strong> Year-round</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    base_price: '',
    duration: '2'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Mock data
      setServices([
        { id: 1, name: 'Portrait Photography', category: 'portrait', base_price: 300, duration: 2, created_at: new Date().toISOString() },
        { id: 2, name: 'Wedding Photography', category: 'wedding', base_price: 1500, duration: 8, created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`/api/services/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/services', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchServices();
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', description: '', category: '', base_price: '', duration: '2' });
    } catch (error) {
      alert('Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchServices();
      } catch (error) {
        alert('Failed to delete service');
      }
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading services...</p></div>;

  return (
    <div className="admin-services">
      <div className="container">
        <div className="admin-header">
          <h1><i className="fas fa-camera"></i> Manage Services</h1>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ name: '', description: '', category: '', base_price: '', duration: '2' });
            }}
            className="btn btn-primary"
          >
            <i className="fas fa-plus"></i> Add New Service
          </button>
        </div>

        {showForm && (
          <div className="form-card mb-5">
            <h3>{editingId ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="portrait">Portrait</option>
                    <option value="wedding">Wedding</option>
                    <option value="event">Event</option>
                    <option value="product">Product</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Base Price ($)</label>
                  <input
                    type="number"
                    name="base_price"
                    value={formData.base_price}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Duration (hours)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingId ? 'Update Service' : 'Add Service'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No services found</td>
                </tr>
              ) : (
                services.map(service => (
                  <tr key={service.id}>
                    <td><strong>{service.name}</strong></td>
                    <td>{service.category}</td>
                    <td>${service.base_price}</td>
                    <td>{service.duration} hours</td>
                    <td>{new Date(service.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleEdit(service)}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
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

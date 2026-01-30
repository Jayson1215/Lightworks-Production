import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/portfolios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPortfolios(response.data.data || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      // Mock data
      setPortfolios([
        { id: 1, title: 'Sunset Portrait', category: 'portrait', image_path: '', created_at: new Date().toISOString() },
        { id: 2, title: 'Wedding Day', category: 'wedding', image_path: '', created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingId) {
        await axios.post(`/api/portfolios/${editingId}`, data, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('/api/portfolios', data, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchPortfolios();
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', description: '', category: '', image: null });
    } catch (error) {
      alert('Failed to save portfolio item');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: null
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/portfolios/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchPortfolios();
      } catch (error) {
        alert('Failed to delete portfolio item');
      }
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading portfolio...</p></div>;

  return (
    <div className="admin-portfolio">
      <div className="container">
        <div className="admin-header">
          <h1><i className="fas fa-images"></i> Manage Portfolio</h1>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ title: '', description: '', category: '', image: null });
            }}
            className="btn btn-primary"
          >
            <i className="fas fa-plus"></i> Add New Portfolio Item
          </button>
        </div>

        {showForm && (
          <div className="form-card mb-5">
            <h3>{editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
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
                  <label>Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingId ? 'Update Item' : 'Add Item'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="portfolio-admin-grid">
          {portfolios.length === 0 ? (
            <p className="text-center">No portfolio items found</p>
          ) : (
            portfolios.map(item => (
              <div key={item.id} className="portfolio-admin-card">
                <div className="portfolio-image-wrapper">
                  {item.image_path ? (
                    <img src={item.image_path} alt={item.title} />
                  ) : (
                    <div className="placeholder-image"><i className="fas fa-image"></i></div>
                  )}
                </div>
                <div className="portfolio-info">
                  <h5>{item.title}</h5>
                  <p className="category">{item.category}</p>
                  <p className="date">{new Date(item.created_at).toLocaleDateString()}</p>
                  <div className="portfolio-actions">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

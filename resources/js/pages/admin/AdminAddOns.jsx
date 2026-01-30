import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminAddOns() {
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchAddOns();
  }, []);

  const fetchAddOns = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/add-ons', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddOns(response.data.data || []);
    } catch (error) {
      console.error('Error fetching add-ons:', error);
      // Mock data
      setAddOns([
        { id: 1, name: 'Album Printing', description: 'Premium album with photos', price: 150, created_at: new Date().toISOString() },
        { id: 2, name: 'Extra Prints', description: '10x12 prints', price: 50, created_at: new Date().toISOString() }
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
        await axios.put(`/api/add-ons/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/add-ons', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchAddOns();
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', description: '', price: '' });
    } catch (error) {
      alert('Failed to save add-on');
    }
  };

  const handleEdit = (addon) => {
    setFormData(addon);
    setEditingId(addon.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/add-ons/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchAddOns();
      } catch (error) {
        alert('Failed to delete add-on');
      }
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading add-ons...</p></div>;

  return (
    <div className="admin-addons">
      <div className="container">
        <div className="admin-header">
          <h1><i className="fas fa-plus-circle"></i> Manage Add-ons</h1>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ name: '', description: '', price: '' });
            }}
            className="btn btn-primary"
          >
            <i className="fas fa-plus"></i> Add New Add-on
          </button>
        </div>

        {showForm && (
          <div className="form-card mb-5">
            <h3>{editingId ? 'Edit Add-on' : 'Add New Add-on'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Add-on Name</label>
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

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingId ? 'Update Add-on' : 'Add Add-on'}
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
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addOns.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No add-ons found</td>
                </tr>
              ) : (
                addOns.map(addon => (
                  <tr key={addon.id}>
                    <td><strong>{addon.name}</strong></td>
                    <td>{addon.description}</td>
                    <td>${addon.price}</td>
                    <td>{new Date(addon.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleEdit(addon)}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(addon.id)}
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

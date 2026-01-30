import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, [selectedCategory]);

  const fetchPortfolios = async () => {
    try {
      const endpoint = selectedCategory === 'All' 
        ? '/api/portfolios' 
        : `/api/portfolios?category=${selectedCategory}`;
      
      const response = await axios.get(endpoint);
      const data = response.data.data || [];
      setPortfolios(data);
      
      if (selectedCategory === 'All') {
        const cats = [...new Set(data.map(p => p.category))];
        setCategories(cats);
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      // Mock data for development
      const mockData = [
        { id: 1, title: 'Sunset Portrait', category: 'portrait', description: 'Beautiful sunset portrait', image_path: 'https://via.placeholder.com/300x200?text=Sunset+Portrait' },
        { id: 2, title: 'Wedding Day', category: 'wedding', description: 'Elegant wedding coverage', image_path: 'https://via.placeholder.com/300x200?text=Wedding+Day' },
        { id: 3, title: 'Corporate Event', category: 'event', description: 'Professional event photography', image_path: 'https://via.placeholder.com/300x200?text=Corporate+Event' },
        { id: 4, title: 'Product Showcase', category: 'product', description: 'Professional product photos', image_path: 'https://via.placeholder.com/300x200?text=Product' },
        { id: 5, title: 'Family Moments', category: 'portrait', description: 'Family portrait session', image_path: 'https://via.placeholder.com/300x200?text=Family' },
        { id: 6, title: 'Engagement Shoot', category: 'wedding', description: 'Pre-wedding photos', image_path: 'https://via.placeholder.com/300x200?text=Engagement' }
      ];
      
      let filtered = mockData;
      if (selectedCategory !== 'All') {
        filtered = mockData.filter(p => p.category === selectedCategory.toLowerCase());
      }
      setPortfolios(filtered);
      
      if (selectedCategory === 'All') {
        const cats = [...new Set(mockData.map(p => p.category))];
        setCategories(cats);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center"><p>Loading...</p></div>;
  }

  return (
    <div className="portfolio-page">
      <div className="container">
        <h1 className="section-title text-center mb-5">Our Portfolio</h1>

        {categories.length > 0 && (
          <div className="category-filter">
            <button
              className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="portfolio-grid">
          {portfolios.length > 0 ? (
            portfolios.map(item => (
              <div key={item.id} className="portfolio-card">
                <div className="portfolio-image-wrapper">
                  {item.image_path ? (
                    <img src={item.image_path} alt={item.title} />
                  ) : (
                    <div className="placeholder-image"><i className="fas fa-image"></i></div>
                  )}
                </div>
                <div className="portfolio-card-body">
                  <h5>{item.title}</h5>
                  <span className="badge badge-primary">{item.category}</span>
                  <p className="text-muted">{item.description?.substring(0, 60)}...</p>
                  <Link to={`/portfolio/${item.id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No portfolio items found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

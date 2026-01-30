import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioDetails();
  }, [id]);

  const fetchPortfolioDetails = async () => {
    try {
      const response = await axios.get(`/api/portfolios/${id}`);
      setPortfolio(response.data.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      // Mock data for development
      const mockPortfolios = {
        1: { id: 1, title: 'Sunset Portrait', category: 'portrait', description: 'A beautiful sunset portrait captured with professional lighting and composition. Perfect example of our portrait photography service.', image_path: 'https://via.placeholder.com/600x400?text=Sunset+Portrait', created_at: new Date().toISOString() },
        2: { id: 2, title: 'Wedding Day', category: 'wedding', description: 'Elegant wedding day photography showcasing the couple\'s special moments throughout the ceremony and reception.', image_path: 'https://via.placeholder.com/600x400?text=Wedding+Day', created_at: new Date().toISOString() },
        3: { id: 3, title: 'Corporate Event', category: 'event', description: 'Professional event photography from a corporate gathering, capturing key moments and attendees.', image_path: 'https://via.placeholder.com/600x400?text=Corporate+Event', created_at: new Date().toISOString() },
        4: { id: 4, title: 'Product Showcase', category: 'product', description: 'Professional product photography highlighting the details and quality of products with proper lighting and composition.', image_path: 'https://via.placeholder.com/600x400?text=Product', created_at: new Date().toISOString() },
        5: { id: 5, title: 'Family Moments', category: 'portrait', description: 'Family portrait session capturing candid moments and genuine emotions of family members together.', image_path: 'https://via.placeholder.com/600x400?text=Family', created_at: new Date().toISOString() },
        6: { id: 6, title: 'Engagement Shoot', category: 'wedding', description: 'Beautiful pre-wedding engagement photos capturing the love and chemistry between the couple.', image_path: 'https://via.placeholder.com/600x400?text=Engagement', created_at: new Date().toISOString() }
      };
      const mockItem = mockPortfolios[id];
      if (mockItem) {
        setPortfolio(mockItem);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-5"><p className="text-center">Loading portfolio details...</p></div>;
  if (!portfolio) return (
    <div className="container mt-5" style={{ textAlign: 'center' }}>
      <h2>Portfolio Item Not Found</h2>
      <p className="text-muted">The portfolio item you're looking for doesn't exist.</p>
      <Link to="/portfolio" className="btn btn-primary">Back to Portfolio</Link>
    </div>
  );

  return (
    <div className="portfolio-detail-page">
      <div className="container">
        <Link to="/portfolio" className="back-link">← Back to Portfolio</Link>

        <div className="portfolio-detail-grid">
          <div className="portfolio-detail-image">
            {portfolio.image_path ? (
              <img src={portfolio.image_path} alt={portfolio.title} />
            ) : (
              <div className="placeholder-large">
                <i className="fas fa-image"></i>
              </div>
            )}
          </div>

          <div className="portfolio-detail-info">
            <h1>{portfolio.title}</h1>
            <span className="badge badge-primary">{portfolio.category}</span>

            <div className="portfolio-description">
              <h3>Project Details</h3>
              <p>{portfolio.description}</p>
            </div>

            <div className="portfolio-meta">
              <div className="meta-item">
                <strong>Category:</strong> {portfolio.category}
              </div>
              <div className="meta-item">
                <strong>Date:</strong> {new Date(portfolio.created_at).toLocaleDateString()}
              </div>
              {portfolio.client_name && (
                <div className="meta-item">
                  <strong>Client:</strong> {portfolio.client_name}
                </div>
              )}
            </div>

            <div className="portfolio-action">
              <Link to="/services" className="btn btn-primary">
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

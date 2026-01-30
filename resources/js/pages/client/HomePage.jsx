import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Capture Your Moments</h1>
            <p className="hero-subtitle">Professional Photography Services for All Occasions</p>
            <Link to="/services" className="btn btn-primary btn-lg">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <h2 className="section-title text-center">Our Photography Services</h2>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-portrait"></i>
              </div>
              <h4>Portrait Photography</h4>
              <p>Professional portraits for individuals, families, and headshots. Capture your best self with our expert photographers.</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-ring"></i>
              </div>
              <h4>Wedding Photography</h4>
              <p>Capture your special day with stunning imagery. Professional coverage from ceremony to reception.</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-camera"></i>
              </div>
              <h4>Event Photography</h4>
              <p>Professional coverage for corporate events, parties, and private celebrations. Memorable moments preserved.</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-box"></i>
              </div>
              <h4>Product Photography</h4>
              <p>Professional product photography for businesses. Perfect for e-commerce and marketing materials.</p>
              <Link to="/services" className="service-link">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="featured-portfolio">
        <div className="container">
          <h2 className="section-title text-center">Featured Works</h2>
          
          <div className="portfolio-grid">
            {[
              { title: 'Portrait Gallery', category: 'Portraits', icon: 'fas fa-images' },
              { title: 'Wedding Collection', category: 'Weddings', icon: 'fas fa-images' },
              { title: 'Event Photos', category: 'Events', icon: 'fas fa-images' },
              { title: 'Product Gallery', category: 'Products', icon: 'fas fa-images' },
            ].map((item, index) => (
              <div key={index} className="portfolio-item">
                <div className="portfolio-image">
                  <i className={`${item.icon}`}></i>
                </div>
                <div className="portfolio-info">
                  <h5>{item.title}</h5>
                  <p className="text-muted">{item.category}</p>
                  <Link to="/portfolio" className="btn btn-sm btn-primary">View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Book Your Session?</h2>
            <p>Check out our services and book your perfect photography session today</p>
            <Link to="/services" className="btn btn-light btn-lg">
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Us</h2>
          
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <h4>Professional Quality</h4>
              <p>Award-winning photographers with years of experience delivering stunning results.</p>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h4>Fast Turnaround</h4>
              <p>Quick editing and delivery of your photos. Get your memories faster than ever.</p>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-smile"></i>
              </div>
              <h4>Exceptional Service</h4>
              <p>Customer satisfaction is our priority. We go above and beyond for every client.</p>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-tag"></i>
              </div>
              <h4>Affordable Pricing</h4>
              <p>Competitive rates for professional photography services without compromising quality.</p>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>High Resolution Images</h4>
              <p>All photos delivered in high resolution for printing and digital use.</p>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h4>Secure & Private</h4>
              <p>Your photos are securely stored and your privacy is completely protected.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

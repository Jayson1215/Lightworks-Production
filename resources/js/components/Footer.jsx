import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h5>About Us</h5>
            <p>Professional photography services for all your special moments. We capture memories that last a lifetime.</p>
          </div>
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/bookings">My Bookings</Link></li>
              <li><a href="mailto:contact@photography.com">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="#portraits">Portrait Photography</a></li>
              <li><a href="#weddings">Wedding Photography</a></li>
              <li><a href="#events">Event Photography</a></li>
              <li><a href="#products">Product Photography</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <p>
              Email: <a href="mailto:info@photography.com">info@photography.com</a><br />
              Phone: <a href="tel:+15551234567">(555) 123-4567</a><br />
              Address: 123 Photography St, City, State 12345
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; 2024 Lightworks Productions. All rights reserved.</p>
          <div className="social-links">
            <a href="#facebook" title="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#instagram" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#twitter" title="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#linkedin" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

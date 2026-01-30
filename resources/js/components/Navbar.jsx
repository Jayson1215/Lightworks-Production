import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-camera"></i> Lightworks Productions
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={() => setIsOpen(false)}>
              <i className="fas fa-images"></i> Portfolio
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setIsOpen(false)}>
              <i className="fas fa-camera"></i> Services
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/bookings" onClick={() => setIsOpen(false)}>
                  <i className="fas fa-calendar"></i> My Bookings
                </Link>
              </li>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>
                    <i className="fas fa-cog"></i> Admin Panel
                  </Link>
                </li>
              )}
              <li className="nav-divider"></li>
              <li>
                <span className="nav-user-info">
                  <i className="fas fa-user-circle"></i> {user.name}
                </span>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-divider"></li>
              <li>
                <Link to="/contacts" onClick={() => setIsOpen(false)} className="nav-auth-link">
                  <i className="fas fa-envelope"></i> Contact
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-primary btn-sm">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

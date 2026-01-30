import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './bootstrap';
import './app.css';

// Client Views
import HomePage from './pages/client/HomePage';
import PortfolioPage from './pages/client/PortfolioPage';
import PortfolioDetail from './pages/client/PortfolioDetail';
import ServicesPage from './pages/client/ServicesPage';
import ServiceDetail from './pages/client/ServiceDetail';
import BookingPage from './pages/client/BookingPage';
import BookingCheckout from './pages/client/BookingCheckout';
import BookingConfirmation from './pages/client/BookingConfirmation';
import MyBookingsPage from './pages/client/MyBookingsPage';
import BookingDetail from './pages/client/BookingDetail';

// Auth Views
import ContactsPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';

// Admin Views
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminBookings from './pages/admin/AdminBookings';
import AdminAddOns from './pages/admin/AdminAddOns';
import AdminReports from './pages/admin/AdminReports';

// Common Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/bookings/create/:serviceId" element={<BookingPage />} />
          <Route path="/bookings/:id/checkout" element={<BookingCheckout />} />
          <Route path="/bookings/:id/confirmation" element={<BookingConfirmation />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/bookings/:id" element={<BookingDetail />} />

          {/* Auth Routes */}
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/add-ons" element={<AdminAddOns />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

// Render app
const appContainer = document.getElementById('app');
if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminReports() {
  const [reportType, setReportType] = useState('bookings');
  const [dateRange, setDateRange] = useState('month');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, [reportType, dateRange]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/reports?type=${reportType}&range=${dateRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReportData(response.data.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
      // Mock data
      setReportData({
        bookings: 42,
        revenue: 12500,
        completionRate: 95,
        avgBookingValue: 297.62,
        topServices: [
          { name: 'Wedding Photography', count: 15 },
          { name: 'Portrait Photography', count: 12 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/reports/export?type=${reportType}&range=${dateRange}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${reportType}-${dateRange}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (error) {
      alert('Failed to export report');
    }
  };

  return (
    <div className="admin-reports">
      <div className="container">
        <h1 className="section-title mb-5"><i className="fas fa-chart-bar"></i> Reports & Analytics</h1>

        <div className="report-filters mb-5">
          <div className="filter-group">
            <div className="form-group">
              <label>Report Type</label>
              <select 
                value={reportType} 
                onChange={(e) => setReportType(e.target.value)}
                className="form-control"
              >
                <option value="bookings">Bookings Report</option>
                <option value="revenue">Revenue Report</option>
                <option value="clients">Clients Report</option>
                <option value="services">Services Performance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date Range</label>
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="form-control"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <button onClick={handleExport} className="btn btn-primary">
              <i className="fas fa-download"></i> Export
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading report data...</p>
        ) : reportData ? (
          <>
            <div className="report-stats-grid">
              <div className="report-stat-card">
                <h4>Total Bookings</h4>
                <h2>{reportData.bookings || 0}</h2>
              </div>

              <div className="report-stat-card">
                <h4>Total Revenue</h4>
                <h2>${(reportData.revenue || 0).toFixed(2)}</h2>
              </div>

              <div className="report-stat-card">
                <h4>Completion Rate</h4>
                <h2>{reportData.completionRate || 0}%</h2>
              </div>

              <div className="report-stat-card">
                <h4>Avg Booking Value</h4>
                <h2>${(reportData.avgBookingValue || 0).toFixed(2)}</h2>
              </div>
            </div>

            {reportData.topServices && (
              <div className="report-section mt-5">
                <h3>Top Services</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th>Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.topServices.map((service, index) => (
                      <tr key={index}>
                        <td>{service.name}</td>
                        <td>{service.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="report-charts mt-5">
              <div className="chart-card">
                <h3>Booking Trend</h3>
                <div className="chart-placeholder">
                  <i className="fas fa-chart-line"></i>
                  <p>Chart visualization</p>
                </div>
              </div>

              <div className="chart-card">
                <h3>Revenue Trend</h3>
                <div className="chart-placeholder">
                  <i className="fas fa-chart-area"></i>
                  <p>Chart visualization</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center">No report data available</p>
        )}
      </div>
    </div>
  );
}

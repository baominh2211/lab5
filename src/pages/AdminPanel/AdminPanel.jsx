/**
 * AdminPanel Page - Exercise 2.3
 * Heavy component for Code Splitting demo
 * Lazy-loaded to reduce initial bundle size
 * Author: Hoang Bao Minh
 */

import React, { useState, useMemo } from 'react';
import './AdminPanel.css';

// Simulate heavy charting data
const generateChartData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    revenue: Math.floor(Math.random() * 100000) + 50000,
    users: Math.floor(Math.random() * 5000) + 1000,
    orders: Math.floor(Math.random() * 2000) + 500
  }));
};

const AdminPanel = () => {
  const [chartData] = useState(generateChartData);
  const [activeMetric, setActiveMetric] = useState('revenue');

  const maxValue = useMemo(() => {
    return Math.max(...chartData.map((d) => d[activeMetric]));
  }, [chartData, activeMetric]);

  const totalRevenue = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.revenue, 0);
  }, [chartData]);

  const totalUsers = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.users, 0);
  }, [chartData]);

  const totalOrders = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.orders, 0);
  }, [chartData]);

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <span className="badge badge-gold">Lazy Loaded</span>
      </div>

      <div className="code-splitting-info">
        <div className="info-icon">📦</div>
        <div>
          <h4>Code Splitting Active</h4>
          <p>
            This AdminPanel component was lazy-loaded using React.lazy() and Suspense. It's only
            downloaded when you navigate to this route, reducing the initial bundle size.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">${totalRevenue.toLocaleString()}</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-info">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{totalUsers.toLocaleString()}</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-info">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{totalOrders.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h3>Monthly Analytics</h3>
          <div className="chart-controls">
            <button
              className={`chart-btn ${activeMetric === 'revenue' ? 'active' : ''}`}
              onClick={() => setActiveMetric('revenue')}
            >
              Revenue
            </button>
            <button
              className={`chart-btn ${activeMetric === 'users' ? 'active' : ''}`}
              onClick={() => setActiveMetric('users')}
            >
              Users
            </button>
            <button
              className={`chart-btn ${activeMetric === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveMetric('orders')}
            >
              Orders
            </button>
          </div>
        </div>

        <div className="chart-container">
          {chartData.map((data, index) => (
            <div key={data.month} className="chart-bar-wrapper">
              <div
                className="chart-bar"
                style={{
                  height: `${(data[activeMetric] / maxValue) * 100}%`,
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span className="bar-value">
                  {activeMetric === 'revenue'
                    ? `$${(data[activeMetric] / 1000).toFixed(0)}k`
                    : data[activeMetric].toLocaleString()}
                </span>
              </div>
              <span className="bar-label">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="code-example">
        <h4>Route-Based Code Splitting</h4>
        <pre>
          <code>{`// App.jsx - Lazy load AdminPanel
import React, { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

// Dynamic import - creates separate chunk
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/admin" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPanel />
          </Suspense>
        } 
      />
    </Routes>
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
};

export default AdminPanel;

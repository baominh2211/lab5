/**
 * App Component - Main Application
 * Includes routing with lazy loading for AdminPanel
 * Author: Hoang Bao Minh
 */

import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from './store/slices/themeSlice';

// Components
import Navigation from './components/Navigation/Navigation';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Pages - Regular imports
import Home from './pages/Home/Home';
import StateManagementPage from './pages/StateManagement/StateManagement';
import PerformancePage from './pages/Performance/Performance';
import PatternsPage from './pages/Patterns/Patterns';
import TestingPage from './pages/Testing/Testing';

// Lazy loaded page - Exercise 2.3: Code Splitting
const AdminPanel = lazy(() => {
  // Simulate loading delay for demo purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./pages/AdminPanel/AdminPanel'));
    }, 500);
  });
});

// Footer Component
const Footer = () => (
  <footer className="footer">
    <p className="footer-text">
      React Advanced Lab © 2024 | Created by{' '}
      <span className="footer-author">Hoang Bao Minh</span>
    </p>
  </footer>
);

function App() {
  const theme = useSelector(selectTheme);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/state" element={<StateManagementPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/testing" element={<TestingPage />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LoadingSpinner message="Loading Admin Panel..." />}>
                <AdminPanel />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

/**
 * Navigation Component
 * Main navigation for the application
 * Author: Hoang Bao Minh
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from '../../store/slices/themeSlice';
import { selectCartItemCount } from '../../store/slices/cartSlice';
import './Navigation.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const cartCount = useSelector(selectCartItemCount);

  return (
    <nav className="nav">
      <div className="nav-content">
        <NavLink to="/" className="nav-brand">
          ⚛️ React Advanced Lab
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/state"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              State Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/performance"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Performance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/patterns"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Patterns
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/testing"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Testing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Admin
              <span className="badge badge-emerald" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>
                Lazy
              </span>
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          {cartCount > 0 && (
            <div className="cart-indicator">
              🛒 <span className="cart-count">{cartCount}</span>
            </div>
          )}
          <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

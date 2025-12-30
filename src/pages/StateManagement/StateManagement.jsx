/**
 * State Management Page
 * Part 1: Complex State Management demos
 * Author: Hoang Bao Minh
 */

import React from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import './StateManagement.css';

const StateManagementPage = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Part 1: Complex State Management</h1>
        <p className="page-subtitle">
          Transition from imperative state manipulation to deterministic state transitions
        </p>
      </header>

      <section className="section">
        <h2 className="section-title">Exercise 1.1: The Fetch Machine (useReducer)</h2>
        <p className="section-description">
          Demonstrates useReducer with Finite State Machine pattern to prevent invalid state
          transitions. The reducer validates each action against allowed transitions.
        </p>
        <UserProfile />
      </section>

      <section className="section">
        <h2 className="section-title">Exercise 1.2: The Global Store (Redux Toolkit)</h2>
        <p className="section-description">
          Shopping cart implementation using Redux Toolkit's configureStore and createSlice.
          Includes memoized selectors with createSelector for tax calculation.
        </p>
        <ShoppingCart />
      </section>
    </div>
  );
};

export default StateManagementPage;

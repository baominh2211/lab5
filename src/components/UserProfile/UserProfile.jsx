/**
 * UserProfile Component - Exercise 1.1 Demo
 * Demonstrates useReducer with Finite State Machine pattern
 * Author: Hoang Bao Minh
 */

import React, { useState } from 'react';
import { useUserFetch } from '../../hooks/useUserFetch';
import './UserProfile.css';

const UserProfile = () => {
  const [userId, setUserId] = useState('');
  const { data, error, status, isIdle, isLoading, isResolved, isRejected, fetchUser, reset } =
    useUserFetch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      fetchUser(userId);
    }
  };

  const handleReset = () => {
    setUserId('');
    reset();
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h3 className="card-title">
          <span className="icon">👤</span>
          User Profile Fetcher
        </h3>
        <span className={`status-badge status-${status}`}>{status.toUpperCase()}</span>
      </div>

      <form onSubmit={handleSubmit} className="fetch-form">
        <div className="input-row">
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID (1-10)"
            min="1"
            max="10"
            className="input"
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading || !userId}>
            {isLoading ? (
              <>
                <span className="spinner spinner-sm"></span>
                Fetching...
              </>
            ) : (
              'Fetch User'
            )}
          </button>
          {!isIdle && (
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </form>

      <div className="state-machine-info">
        <h4>Finite State Machine</h4>
        <div className="fsm-states">
          <div className={`fsm-state ${isIdle ? 'active' : ''}`}>IDLE</div>
          <span className="fsm-arrow">→</span>
          <div className={`fsm-state ${isLoading ? 'active' : ''}`}>LOADING</div>
          <span className="fsm-arrow">→</span>
          <div className={`fsm-state ${isResolved ? 'active success' : ''}`}>RESOLVED</div>
          <div className={`fsm-state ${isRejected ? 'active error' : ''}`}>REJECTED</div>
        </div>
      </div>

      <div className="result-container">
        {isIdle && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>Enter a user ID to fetch profile data</p>
          </div>
        )}

        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading user data...</p>
          </div>
        )}

        {isRejected && (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <p className="error-message">{error}</p>
          </div>
        )}

        {isResolved && data && (
          <div className="user-data animate-fade-in">
            <div className="user-avatar">
              {data.name?.charAt(0) || 'U'}
            </div>
            <div className="user-details">
              <h4 className="user-name">{data.name}</h4>
              <p className="user-username">@{data.username}</p>
              <div className="user-info-grid">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{data.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{data.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Website</span>
                  <span className="info-value">{data.website}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Company</span>
                  <span className="info-value">{data.company?.name}</span>
                </div>
                <div className="info-item full-width">
                  <span className="info-label">Address</span>
                  <span className="info-value">
                    {data.address?.street}, {data.address?.suite}, {data.address?.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="code-example">
        <h4>Implementation Pattern</h4>
        <pre>
          <code>{`// Finite State Machine Pattern
const validTransitions = {
  idle: ['FETCH_INIT'],
  loading: ['FETCH_SUCCESS', 'FETCH_FAILURE'],
  resolved: ['FETCH_INIT', 'RESET'],
  rejected: ['FETCH_INIT', 'RESET']
};

// Reducer validates transitions
if (!validTransitions[state.status].includes(action.type)) {
  console.warn('Invalid transition');
  return state;
}`}</code>
        </pre>
      </div>
    </div>
  );
};

export default UserProfile;

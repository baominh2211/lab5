/**
 * LoginForm Component - Exercise 4.1
 * Integration Testing Demo with user interactions
 * Author: Hoang Bao Minh
 */

import React, { useState } from 'react';
import './LoginForm.css';

// Simulated API function
export const loginAPI = async (email, password) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Simulate success
  return {
    success: true,
    user: {
      email,
      name: email.split('@')[0],
      token: 'mock-jwt-token-12345'
    }
  };
};

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const result = await loginAPI(email, password);
      setStatus('success');
      setUser(result.user);
      onLoginSuccess?.(result.user);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setStatus('idle');
    setError('');
    setUser(null);
  };

  if (status === 'success' && user) {
    return (
      <div className="login-success animate-fade-in">
        <div className="success-icon">✓</div>
        <h3>Welcome back, {user.name}!</h3>
        <p className="text-muted">You have successfully logged in.</p>
        <button className="btn btn-secondary mt-lg" onClick={handleReset}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label htmlFor="email" className="input-label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input"
          disabled={status === 'loading'}
          aria-describedby={error ? 'error-message' : undefined}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="input"
          disabled={status === 'loading'}
          aria-describedby={error ? 'error-message' : undefined}
        />
      </div>

      {status === 'error' && (
        <div id="error-message" className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={status === 'loading' || !email || !password}
      >
        {status === 'loading' ? (
          <>
            <span className="spinner spinner-sm"></span>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};

export default LoginForm;

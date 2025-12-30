/**
 * ErrorFallback Component - Exercise 4.2
 * Fallback UI for Error Boundaries
 * Author: Hoang Bao Minh
 */

import React from 'react';
import './ErrorFallback.css';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-fallback">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-message">{error?.message || 'An unexpected error occurred'}</p>
        
        <div className="error-details">
          <h4>Error Details</h4>
          <pre className="error-stack">
            {error?.stack?.slice(0, 500) || 'No stack trace available'}
          </pre>
        </div>

        <div className="error-actions">
          {resetErrorBoundary && (
            <button className="btn btn-primary" onClick={resetErrorBoundary}>
              Try Again
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;

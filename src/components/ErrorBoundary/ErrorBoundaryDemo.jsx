/**
 * ErrorBoundaryDemo Component - Exercise 4.2
 * Demonstrates Error Boundary with Bomb component
 * Author: Hoang Bao Minh
 */

import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './ErrorFallback.css';

/**
 * Bomb Component - Throws error when rendered
 */
const Bomb = () => {
  throw new Error('💥 Boom! This component exploded!');
};

/**
 * Mini Error Fallback for demo section
 */
const MiniFallback = ({ error, resetErrorBoundary }) => (
  <div className="mini-error-fallback">
    <div className="error-icon">💥</div>
    <h4>Component Crashed!</h4>
    <p>{error.message}</p>
    <button className="btn btn-primary" onClick={resetErrorBoundary}>
      Reset
    </button>
  </div>
);

const ErrorBoundaryDemo = () => {
  const [shouldExplode, setShouldExplode] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setShouldExplode(false);
    setKey((k) => k + 1);
  };

  return (
    <div className="error-demo-container">
      <div className="error-demo-header">
        <h3 className="card-title">
          <span className="icon">🛡️</span>
          Error Boundary Demo
        </h3>
        <p className="text-muted mt-sm">
          Catch JavaScript errors in child components and display fallback UI
        </p>
      </div>

      <div className="error-test-area">
        <p>
          Click the button below to render a "Bomb" component that throws an error. The Error
          Boundary will catch it and show the fallback UI instead of crashing the entire app.
        </p>

        <button
          className="btn btn-danger"
          onClick={() => setShouldExplode(true)}
          disabled={shouldExplode}
        >
          {shouldExplode ? '💣 Bomb Active!' : '💣 Trigger Error'}
        </button>

        <ErrorBoundary
          key={key}
          FallbackComponent={MiniFallback}
          onReset={handleReset}
          onError={(error, errorInfo) => {
            console.log('Error caught by boundary:', error);
            console.log('Error info:', errorInfo);
          }}
        >
          {shouldExplode && (
            <div className="bomb-component">
              <h4>Bomb Component Area</h4>
              <p className="text-muted">This area will explode...</p>
              <Bomb />
            </div>
          )}
        </ErrorBoundary>
      </div>

      <div className="code-example mt-xl">
        <h4>Implementation</h4>
        <pre>
          <code>{`import { ErrorBoundary } from 'react-error-boundary';

// Bomb component that always throws
const Bomb = () => {
  throw new Error('💥 Boom!');
};

// Fallback UI component
const Fallback = ({ error, resetErrorBoundary }) => (
  <div>
    <h4>Something went wrong</h4>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

// Usage
<ErrorBoundary FallbackComponent={Fallback}>
  <Bomb />
</ErrorBoundary>`}</code>
        </pre>
      </div>
    </div>
  );
};

export default ErrorBoundaryDemo;

/**
 * ErrorBoundary Tests - Exercise 4.2
 * Testing Error Boundaries with React Testing Library
 * Author: Hoang Bao Minh
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Silence console.error during tests to keep logs clean
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

/**
 * Bomb Component - Throws error when rendered
 */
const Bomb = () => {
  throw new Error('💥 Boom! This component exploded!');
};

/**
 * Fallback Component
 */
const FallbackComponent = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

describe('ErrorBoundary Tests', () => {
  /**
   * Test 1: Error Boundary catches errors and displays fallback
   */
  it('catches errors and displays fallback UI', () => {
    render(
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Bomb />
      </ErrorBoundary>
    );

    // Assert - Fallback UI is visible
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/boom/i)).toBeInTheDocument();
  });

  /**
   * Test 2: Application does not crash
   */
  it('does not crash the entire application', () => {
    const { container } = render(
      <div>
        <p>Other content</p>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Bomb />
        </ErrorBoundary>
      </div>
    );

    // Assert - Other content is still visible
    expect(container).toBeInTheDocument();
    expect(screen.getByText(/other content/i)).toBeInTheDocument();
  });

  /**
   * Test 3: Reset functionality works
   */
  it('can reset the error boundary', async () => {
    const user = userEvent.setup();
    let shouldThrow = true;

    const MaybeThrow = () => {
      if (shouldThrow) {
        throw new Error('Error!');
      }
      return <p>Recovered successfully!</p>;
    };

    render(
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <MaybeThrow />
      </ErrorBoundary>
    );

    // Error is shown
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Fix the error condition
    shouldThrow = false;

    // Click reset button
    await user.click(screen.getByRole('button', { name: /try again/i }));

    // Component recovers
    expect(screen.getByText(/recovered successfully/i)).toBeInTheDocument();
  });

  /**
   * Test 4: onError callback is called
   */
  it('calls onError callback when error occurs', () => {
    const onError = jest.fn();

    render(
      <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
        <Bomb />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  /**
   * Test 5: Nested error boundaries work correctly
   */
  it('handles nested error boundaries', () => {
    const OuterFallback = () => <p>Outer error</p>;
    const InnerFallback = () => <p>Inner error</p>;

    render(
      <ErrorBoundary fallback={<OuterFallback />}>
        <div>
          <p>Safe content</p>
          <ErrorBoundary fallback={<InnerFallback />}>
            <Bomb />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    );

    // Inner boundary catches the error
    expect(screen.getByText(/inner error/i)).toBeInTheDocument();
    // Safe content is still visible
    expect(screen.getByText(/safe content/i)).toBeInTheDocument();
  });
});

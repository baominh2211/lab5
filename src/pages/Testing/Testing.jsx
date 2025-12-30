/**
 * Testing Page
 * Part 4: Testing Strategies demos
 * Author: Hoang Bao Minh
 */

import React from 'react';
import LoginFormDemo from '../../components/LoginForm/LoginFormDemo';
import ErrorBoundaryDemo from '../../components/ErrorBoundary/ErrorBoundaryDemo';
import '../StateManagement/StateManagement.css';

const TestingPage = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Part 4: Testing Strategies</h1>
        <p className="page-subtitle">
          Write resilient tests using Jest and React Testing Library focusing on user behavior
        </p>
      </header>

      <section className="section">
        <h2 className="section-title">Exercise 4.1: Integration Testing a Form</h2>
        <p className="section-description">
          Integration tests check how multiple units work together. React Testing Library
          encourages testing user interactions (clicking, typing) rather than implementation
          details. Test what the user sees, not internal state.
        </p>
        <LoginFormDemo />
      </section>

      <section className="section">
        <h2 className="section-title">Exercise 4.2: Testing Error Boundaries</h2>
        <p className="section-description">
          Error Boundaries catch JavaScript errors in child components and display fallback UI.
          The react-error-boundary library provides a functional wrapper. Test that the app
          doesn't crash and the fallback UI appears.
        </p>
        <ErrorBoundaryDemo />
      </section>
    </div>
  );
};

export default TestingPage;

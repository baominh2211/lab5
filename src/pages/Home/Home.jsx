/**
 * Home Page
 * Landing page for the React Advanced Lab
 * Author: Hoang Bao Minh
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  {
    icon: '🔄',
    title: 'Complex State Management',
    description: 'Learn useReducer with Finite State Machine pattern and Redux Toolkit with memoized selectors.',
    link: '/state',
    exercises: ['Exercise 1.1: The Fetch Machine', 'Exercise 1.2: The Global Store']
  },
  {
    icon: '⚡',
    title: 'Performance Engineering',
    description: 'Master useMemo, useCallback, React.memo, and Route-based Code Splitting.',
    link: '/performance',
    exercises: ['Exercise 2.1: The Laggy List', 'Exercise 2.2: Stabilization', 'Exercise 2.3: Code Splitting']
  },
  {
    icon: '🎨',
    title: 'Advanced Design Patterns',
    description: 'Build reusable components with Compound Components and React Portals.',
    link: '/patterns',
    exercises: ['Exercise 3.1: Compound Tabs', 'Exercise 3.2: Portal Modal']
  },
  {
    icon: '🧪',
    title: 'Testing Strategies',
    description: 'Write resilient tests using Jest and React Testing Library with Error Boundaries.',
    link: '/testing',
    exercises: ['Exercise 4.1: Integration Testing', 'Exercise 4.2: Error Boundaries']
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-badge">Lab 5</div>
        <h1 className="hero-title">React Advanced</h1>
        <p className="hero-subtitle">
          Production-Ready Practical Exercises
        </p>
        <p className="hero-description">
          Master advanced React concepts including complex state management, performance optimization,
          advanced design patterns, and integration testing strategies.
        </p>
        <div className="hero-meta">
          <span className="meta-item">
            <span className="meta-icon">👤</span>
            Hoang Bao Minh
          </span>
          <span className="meta-item">
            <span className="meta-icon">📚</span>
            4 Parts
          </span>
          <span className="meta-item">
            <span className="meta-icon">✨</span>
            8 Exercises
          </span>
        </div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Course Content</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-exercises">
                {feature.exercises.map((exercise, i) => (
                  <li key={i}>{exercise}</li>
                ))}
              </ul>
              <span className="feature-link">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="tech-stack-section">
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <span className="tech-name">React 18</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🔄</span>
            <span className="tech-name">Redux Toolkit</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🛣️</span>
            <span className="tech-name">React Router</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🧪</span>
            <span className="tech-name">Testing Library</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">⚡</span>
            <span className="tech-name">Vite</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🎨</span>
            <span className="tech-name">CSS Variables</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

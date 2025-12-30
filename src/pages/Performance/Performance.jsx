/**
 * Performance Page
 * Part 2: Performance Engineering demos
 * Author: Hoang Bao Minh
 */

import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import '../StateManagement/StateManagement.css';

const PerformancePage = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Part 2: Performance Engineering</h1>
        <p className="page-subtitle">
          Diagnose and fix performance bottlenecks using React's optimization hooks
        </p>
      </header>

      <section className="section">
        <h2 className="section-title">Exercise 2.1 & 2.2: The Laggy List & Stabilization</h2>
        <p className="section-description">
          This dashboard renders a large list (10,000 items) with sorting and filtering.
          Without optimization, toggling the theme would cause the entire list to re-sort and
          re-render. useMemo caches the sorted/filtered results, useCallback stabilizes the
          delete handler, and React.memo prevents unnecessary child re-renders.
        </p>
        <Dashboard />
      </section>

      <section className="section">
        <h2 className="section-title">Exercise 2.3: Route-Based Code Splitting</h2>
        <p className="section-description">
          The Admin Panel page is lazy-loaded using React.lazy and Suspense. Navigate to the
          Admin page in the navigation to see code splitting in action - you'll notice a
          brief loading spinner as the chunk loads.
        </p>
        <div className="code-example">
          <h4>Implementation</h4>
          <pre>
            <code>{`// Lazy load heavy components
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// Wrap in Suspense with fallback
<Route 
  path="/admin" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <AdminPanel />
    </Suspense>
  } 
/>`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

export default PerformancePage;

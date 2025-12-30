/**
 * Dashboard Component - Exercise 2.1 & 2.2
 * Demonstrates useMemo, useCallback, and React.memo
 * Author: Hoang Bao Minh
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from '../../store/slices/themeSlice';
import ListItem from './ListItem';
import './Dashboard.css';

// Generate sample data (10,000 items for performance testing)
const generateItems = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    value: Math.random() * 1000,
    category: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'][index % 5],
    priority: ['High', 'Medium', 'Low'][index % 3]
  }));
};

const INITIAL_ITEMS = generateItems(10000);

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [sortField, setSortField] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [renderCount, setRenderCount] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Track parent renders
  React.useEffect(() => {
    setRenderCount((c) => c + 1);
  }, [theme]);

  /**
   * Exercise 2.1: useMemo for expensive sorting/filtering
   * Only recalculates when items, sortField, sortOrder, or filterCategory changes
   * NOT when theme changes!
   */
  const processedItems = useMemo(() => {
    console.log('📊 Sorting and filtering items...');
    const startTime = performance.now();

    let result = [...items];

    // Filter
    if (filterCategory !== 'all') {
      result = result.filter((item) => item.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const comparison = typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    const endTime = performance.now();
    console.log(`✅ Processing took ${(endTime - startTime).toFixed(2)}ms`);

    return result;
  }, [items, sortField, sortOrder, filterCategory]);

  // Display limited items for performance (expand to show more)
  const displayedItems = useMemo(() => {
    return showAll ? processedItems.slice(0, 1000) : processedItems.slice(0, 50);
  }, [processedItems, showAll]);

  /**
   * Exercise 2.2: useCallback to stabilize function references
   * Prevents ListItem re-renders when theme changes
   */
  const handleDelete = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const categories = ['all', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h3 className="card-title">
            <span className="icon">📊</span>
            Performance Dashboard
          </h3>
          <p className="dashboard-subtitle">
            {processedItems.length.toLocaleString()} items | Displaying{' '}
            {displayedItems.length.toLocaleString()}
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Parent Renders</span>
            <span className="stat-value">{renderCount}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="control-group">
          <button
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={handleThemeToggle}
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div className="control-group">
          <label className="control-label">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select-input"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Sort By</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="select-input"
          >
            <option value="value">Value</option>
            <option value="name">Name</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Order</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select-input"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="optimization-info">
        <div className="info-card">
          <h4>🧠 useMemo</h4>
          <p>Sorting/filtering only runs when data or filters change, not on theme toggle</p>
        </div>
        <div className="info-card">
          <h4>📌 useCallback</h4>
          <p>handleDelete reference is stable, preventing unnecessary child re-renders</p>
        </div>
        <div className="info-card">
          <h4>🔒 React.memo</h4>
          <p>ListItem only re-renders when its specific props change</p>
        </div>
      </div>

      <div className="list-header">
        <span className="col-name">Name</span>
        <span className="col-category">Category</span>
        <span className="col-priority">Priority</span>
        <span className="col-value">Value</span>
        <span className="col-action">Action</span>
      </div>

      <div className="large-list">
        {displayedItems.map((item) => (
          <ListItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>

      {!showAll && processedItems.length > 50 && (
        <div className="load-more">
          <button className="btn btn-secondary" onClick={() => setShowAll(true)}>
            Load More ({Math.min(1000, processedItems.length) - 50} more items)
          </button>
        </div>
      )}

      <div className="code-example">
        <h4>Optimization Pattern</h4>
        <pre>
          <code>{`// useMemo prevents expensive recalculation
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.value - b.value);
}, [items]); // Only recalculates when items change

// useCallback stabilizes function reference
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // Empty deps = stable reference

// React.memo wraps the child component
const ListItem = React.memo(({ item, onDelete }) => {
  console.log('ListItem render:', item.id);
  return <div>...</div>;
});`}</code>
        </pre>
      </div>
    </div>
  );
};

export default Dashboard;

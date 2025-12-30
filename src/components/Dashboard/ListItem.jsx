/**
 * ListItem Component - Optimized with React.memo
 * Exercise 2.1 & 2.2: Performance Optimization
 * Author: Hoang Bao Minh
 */

import React, { useRef } from 'react';

/**
 * ListItem wrapped with React.memo
 * Only re-renders when item or onDelete props change
 */
const ListItem = React.memo(({ item, onDelete }) => {
  // Track renders for debugging
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Uncomment to see render logs
  // console.log(`ListItem ${item.id} rendered ${renderCount.current} times`);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="list-item">
      <span className="col-name">{item.name}</span>
      <span className="col-category">
        <span className="category-badge">{item.category}</span>
      </span>
      <span className="col-priority">
        <span className={`priority-badge ${getPriorityClass(item.priority)}`}>
          {item.priority}
        </span>
      </span>
      <span className="col-value">${item.value.toFixed(2)}</span>
      <span className="col-action">
        <button
          className="delete-btn"
          onClick={() => onDelete(item.id)}
          aria-label={`Delete ${item.name}`}
        >
          ✕
        </button>
      </span>
    </div>
  );
});

// Display name for DevTools
ListItem.displayName = 'ListItem';

export default ListItem;

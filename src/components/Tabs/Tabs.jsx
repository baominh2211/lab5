/**
 * Tabs Compound Component - Exercise 3.1
 * Demonstrates Compound Component pattern with Context
 * Author: Hoang Bao Minh
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import './Tabs.css';

// Create Context for sharing tab state
const TabsContext = createContext(null);

/**
 * Custom hook to access Tabs context
 * Throws error if used outside TabsProvider
 */
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a <Tabs> component');
  }
  return context;
};

/**
 * Main Tabs container component
 * Provides context for all child components
 */
const Tabs = ({ children, defaultIndex = 0, onChange }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const setActiveTab = useCallback(
    (index) => {
      setActiveTabIndex(index);
      onChange?.(index);
    },
    [onChange]
  );

  const value = {
    activeTabIndex,
    setActiveTab
  };

  return (
    <TabsContext.Provider value={value}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

/**
 * Tabs.List - Container for tab buttons
 */
const TabsList = ({ children, className = '' }) => {
  return (
    <div className={`tabs-list ${className}`} role="tablist">
      {children}
    </div>
  );
};

/**
 * Tabs.Tab - Individual tab button
 */
const Tab = ({ children, index, disabled = false, className = '' }) => {
  const { activeTabIndex, setActiveTab } = useTabsContext();
  const isActive = activeTabIndex === index;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(index);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={`tab-button ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/**
 * Tabs.Panel - Content panel for each tab
 */
const TabsPanel = ({ children, index, className = '' }) => {
  const { activeTabIndex } = useTabsContext();
  const isActive = activeTabIndex === index;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      className={`tab-panel ${className}`}
    >
      {children}
    </div>
  );
};

// Attach sub-components to main component
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;

export default Tabs;

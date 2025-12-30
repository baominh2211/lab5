/**
 * TabsDemo Component - Exercise 3.1 Demo
 * Demonstrates Compound Component pattern
 * Author: Hoang Bao Minh
 */

import React from 'react';
import Tabs from './Tabs';
import './Tabs.css';

const TabsDemo = () => {
  const handleTabChange = (index) => {
    console.log(`Tab changed to index: ${index}`);
  };

  return (
    <div className="tabs-demo-container">
      <div className="tabs-demo-header">
        <h3 className="card-title">
          <span className="icon">📑</span>
          Compound Tabs Component
        </h3>
        <p className="text-muted mt-sm">
          Flexible API allowing custom markup between components
        </p>
      </div>

      <Tabs defaultIndex={0} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab index={0}>⚛️ React</Tabs.Tab>
          <Tabs.Tab index={1}>🔄 Redux</Tabs.Tab>
          <Tabs.Tab index={2}>🎨 Styling</Tabs.Tab>
          <Tabs.Tab index={3} disabled>
            🔒 Locked
          </Tabs.Tab>
        </Tabs.List>

        <div className="divider"></div>

        <Tabs.Panel index={0}>
          <div className="tab-content">
            <h4>React Fundamentals</h4>
            <p>
              React is a JavaScript library for building user interfaces. It lets you compose
              complex UIs from small and isolated pieces of code called "components".
            </p>
            <ul>
              <li>Component-based architecture</li>
              <li>Virtual DOM for efficient updates</li>
              <li>Unidirectional data flow</li>
              <li>Rich ecosystem and tooling</li>
            </ul>
          </div>
        </Tabs.Panel>

        <Tabs.Panel index={1}>
          <div className="tab-content">
            <h4>Redux State Management</h4>
            <p>
              Redux is a predictable state container for JavaScript apps. It helps you write
              applications that behave consistently and are easy to test.
            </p>
            <ul>
              <li>Single source of truth (Store)</li>
              <li>State is read-only (Actions)</li>
              <li>Changes via pure functions (Reducers)</li>
              <li>Redux Toolkit simplifies setup</li>
            </ul>
          </div>
        </Tabs.Panel>

        <Tabs.Panel index={2}>
          <div className="tab-content">
            <h4>Modern CSS Styling</h4>
            <p>
              Modern CSS provides powerful features for creating responsive, maintainable
              styles without the need for preprocessors.
            </p>
            <ul>
              <li>CSS Custom Properties (Variables)</li>
              <li>Flexbox and Grid layouts</li>
              <li>CSS Modules for scoping</li>
              <li>Animations and transitions</li>
            </ul>
          </div>
        </Tabs.Panel>
      </Tabs>

      <div className="code-example mt-xl">
        <h4>Usage Example</h4>
        <pre>
          <code>{`<Tabs defaultIndex={0}>
  <Tabs.List>
    <Tabs.Tab index={0}>React</Tabs.Tab>
    <Tabs.Tab index={1}>Redux</Tabs.Tab>
  </Tabs.List>
  
  <div className="divider"></div> {/* Custom markup! */}
  
  <Tabs.Panel index={0}>React content...</Tabs.Panel>
  <Tabs.Panel index={1}>Redux content...</Tabs.Panel>
</Tabs>`}</code>
        </pre>
      </div>
    </div>
  );
};

export default TabsDemo;

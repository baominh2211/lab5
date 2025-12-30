/**
 * Patterns Page
 * Part 3: Advanced Design Patterns demos
 * Author: Hoang Bao Minh
 */

import React from 'react';
import TabsDemo from '../../components/Tabs/TabsDemo';
import ModalDemo from '../../components/Modal/ModalDemo';
import '../StateManagement/StateManagement.css';

const PatternsPage = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Part 3: Advanced Design Patterns</h1>
        <p className="page-subtitle">
          Build reusable, flexible component libraries using modern React patterns
        </p>
      </header>

      <section className="section">
        <h2 className="section-title">Exercise 3.1: The Compound Tabs Component</h2>
        <p className="section-description">
          The Compound Component pattern allows components to share implicit state through Context,
          providing a flexible API similar to native &lt;select&gt; and &lt;option&gt; elements.
          Custom markup can be inserted between child components.
        </p>
        <TabsDemo />
      </section>

      <section className="section">
        <h2 className="section-title">Exercise 3.2: The "Trapdoor" Modal (Portals)</h2>
        <p className="section-description">
          React Portals let you render children into a DOM node outside the parent hierarchy,
          essential for modals that need to escape CSS clipping (overflow: hidden). Despite
          rendering in document.body, events still bubble through the React tree.
        </p>
        <ModalDemo />
      </section>
    </div>
  );
};

export default PatternsPage;

/**
 * ModalDemo Component - Exercise 3.2 Demo
 * Demonstrates Portal and Event Bubbling
 * Author: Hoang Bao Minh
 */

import React, { useState } from 'react';
import Modal from './Modal';
import './Modal.css';

const ModalDemo = () => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [events, setEvents] = useState([]);

  // Event handler on parent div - demonstrates event bubbling from Portal
  const handleParentClick = (e) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents((prev) => [
      { time: timestamp, type: 'PARENT_CLICK', target: e.target.className },
      ...prev.slice(0, 9) // Keep last 10 events
    ]);
  };

  const addEvent = (type) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents((prev) => [{ time: timestamp, type, target: 'modal' }, ...prev.slice(0, 9)]);
  };

  return (
    <div className="modal-demo-container" onClick={handleParentClick}>
      <div className="modal-demo-header">
        <h3 className="card-title">
          <span className="icon">🚪</span>
          Portal Modal Component
        </h3>
        <p className="text-muted mt-sm">
          Escapes CSS stacking context while preserving React event bubbling
        </p>
      </div>

      <div className="clipped-card">
        <h4>Card with overflow: hidden</h4>
        <p>
          Without Portals, modals inside this card would be clipped by the parent's overflow
          property. Using createPortal, the modal renders in document.body but maintains React's
          synthetic event bubbling.
        </p>

        <div className="demo-buttons">
          <button className="btn btn-primary" onClick={() => setIsSmallOpen(true)}>
            Small Modal
          </button>
          <button className="btn btn-secondary" onClick={() => setIsMediumOpen(true)}>
            Medium Modal
          </button>
          <button className="btn btn-secondary" onClick={() => setIsLargeOpen(true)}>
            Large Modal
          </button>
        </div>
      </div>

      {/* Small Modal */}
      <Modal isOpen={isSmallOpen} onClose={() => setIsSmallOpen(false)} title="Small Modal" size="small">
        <p>This is a small modal dialog.</p>
        <p className="text-muted mt-md">
          Click the button below - it will bubble up to the parent div in the React tree, even
          though it's rendered in document.body!
        </p>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setIsSmallOpen(false)}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              addEvent('MODAL_BUTTON_CLICK');
              setIsSmallOpen(false);
            }}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      {/* Medium Modal */}
      <Modal
        isOpen={isMediumOpen}
        onClose={() => setIsMediumOpen(false)}
        title="Medium Modal"
        size="medium"
      >
        <div className="tab-content">
          <h4>Event Bubbling Challenge</h4>
          <p>
            Even though this modal is rendered in a Portal (outside the parent DOM), React's
            synthetic event system maintains the virtual DOM hierarchy for event bubbling.
          </p>
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-gold)' }}>
                ✓
              </span>
              Modal renders in document.body (Portal)
            </li>
            <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-gold)' }}>
                ✓
              </span>
              Escapes parent's overflow: hidden
            </li>
            <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent-gold)' }}>
                ✓
              </span>
              Events still bubble through React tree
            </li>
          </ul>
        </div>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setIsMediumOpen(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Large Modal */}
      <Modal
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Large Modal"
        size="large"
      >
        <div className="code-example">
          <h4>Portal Implementation</h4>
          <pre>
            <code>{`import { createPortal } from 'react-dom';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  
  const modalRoot = document.getElementById('modal-root');
  
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        {children}
      </div>
    </div>,
    modalRoot // Renders here instead of parent!
  );
};`}</code>
          </pre>
        </div>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setIsLargeOpen(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Event Log */}
      <div className="event-log">
        <h4>Event Log (Click Events Bubbling)</h4>
        {events.length === 0 ? (
          <p className="text-muted">Click buttons to see event bubbling in action...</p>
        ) : (
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index}>
                <span className="event-time">{event.time}</span>
                <span className="event-type">{event.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalDemo;

/**
 * Modal Component with Portal - Exercise 3.2
 * Demonstrates createPortal for escaping CSS stacking context
 * Author: Hoang Bao Minh
 */

import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

/**
 * Modal component using React Portal
 * Renders content outside the DOM hierarchy to avoid CSS clipping
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true
}) => {
  // Handle escape key press
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Add/remove escape listener and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  // Don't render if not open
  if (!isOpen) return null;

  // Get modal root element
  const modalRoot = document.getElementById('modal-root') || document.body;

  // Modal content
  const modalContent = (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-container modal-${size}`} role="dialog" aria-modal="true">
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            {showCloseButton && (
              <button className="modal-close" onClick={onClose} aria-label="Close modal">
                ✕
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );

  // Use createPortal to render outside parent DOM
  return createPortal(modalContent, modalRoot);
};

/**
 * Modal.Footer - Optional footer component
 */
const ModalFooter = ({ children, className = '' }) => {
  return <div className={`modal-footer ${className}`}>{children}</div>;
};

Modal.Footer = ModalFooter;

export default Modal;

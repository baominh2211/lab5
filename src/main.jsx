/**
 * React Advanced Lab - Entry Point
 * Author: Hoang Bao Minh
 * Production Ready Application
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './store/store';
import App from './App';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback';
import './styles/global.css';

// Error handler for logging
const handleError = (error, errorInfo) => {
  console.error('Application Error:', error);
  console.error('Error Info:', errorInfo);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

/**
 * LoginForm Tests - Exercise 4.1
 * Integration Testing with React Testing Library
 * Author: Hoang Bao Minh
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm, { loginAPI } from '../components/LoginForm/LoginForm';

// Mock the login API
jest.mock('../components/LoginForm/LoginForm', () => {
  const originalModule = jest.requireActual('../components/LoginForm/LoginForm');
  return {
    ...originalModule,
    loginAPI: jest.fn()
  };
});

describe('LoginForm Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test 1: Form renders correctly
   */
  it('renders email and password inputs with submit button', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  /**
   * Test 2: User can type in inputs
   */
  it('allows user to type email and password', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  /**
   * Test 3: Submit button is disabled when inputs are empty
   */
  it('disables submit button when inputs are empty', () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeDisabled();
  });

  /**
   * Test 4: Shows success message after valid login
   */
  it('displays success message after valid login', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    loginAPI.mockResolvedValueOnce({
      success: true,
      user: { email: 'test@example.com', name: 'test' }
    });

    render(<LoginForm />);

    // Act
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Assert - Wait for success message
    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
  });

  /**
   * Test 5: Shows error message on failed login
   */
  it('displays error message on login failure', async () => {
    const user = userEvent.setup();
    
    // Mock failed API response
    loginAPI.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    // Assert - Wait for error message
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  /**
   * Test 6: Shows loading state during submission
   */
  it('shows loading state while submitting', async () => {
    const user = userEvent.setup();
    
    // Mock delayed API response
    loginAPI.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Assert - Loading state
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });

  /**
   * Anti-Pattern Check: Don't test internal state
   * ❌ expect(component.state.isLoggedIn).toBe(true);
   * ✓ Test what the user sees instead
   */
});

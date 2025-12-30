/**
 * LoginFormDemo Component - Exercise 4.1 Demo
 * Integration Testing demonstration
 * Author: Hoang Bao Minh
 */

import React from 'react';
import LoginForm from './LoginForm';
import './LoginForm.css';

const LoginFormDemo = () => {
  const handleLoginSuccess = (user) => {
    console.log('Login successful:', user);
  };

  return (
    <div className="testing-demo-container">
      <div className="testing-demo-header">
        <h3 className="card-title">
          <span className="icon">🧪</span>
          Integration Testing Demo
        </h3>
        <p className="text-muted mt-sm">
          Testing user interactions with React Testing Library
        </p>
      </div>

      <div className="testing-layout">
        <div className="form-section">
          <h4>
            <span>📝</span>
            Live Login Form
          </h4>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>

        <div className="test-section">
          <h4>
            <span>🔬</span>
            Test Strategy
          </h4>

          <ul className="test-steps">
            <li className="test-step">
              <span className="step-number">1</span>
              <div className="step-content">
                <h5>Arrange</h5>
                <p>Render the LoginForm component</p>
                <code className="step-code">render(&lt;LoginForm /&gt;);</code>
              </div>
            </li>

            <li className="test-step">
              <span className="step-number">2</span>
              <div className="step-content">
                <h5>Act - Type Email</h5>
                <p>Use userEvent to type in the email field</p>
                <code className="step-code">
                  await userEvent.type(emailInput, 'test@example.com');
                </code>
              </div>
            </li>

            <li className="test-step">
              <span className="step-number">3</span>
              <div className="step-content">
                <h5>Act - Type Password</h5>
                <p>Use userEvent to type in the password field</p>
                <code className="step-code">
                  await userEvent.type(passwordInput, 'password123');
                </code>
              </div>
            </li>

            <li className="test-step">
              <span className="step-number">4</span>
              <div className="step-content">
                <h5>Act - Submit Form</h5>
                <p>Click the submit button</p>
                <code className="step-code">await userEvent.click(submitBtn);</code>
              </div>
            </li>

            <li className="test-step">
              <span className="step-number">5</span>
              <div className="step-content">
                <h5>Assert</h5>
                <p>Wait for success message to appear</p>
                <code className="step-code">
                  await screen.findByText(/welcome back/i);
                </code>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="code-example mt-xl">
        <h4>Complete Test Example</h4>
        <pre>
          <code>{`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('displays success message after valid login', async () => {
    // Arrange
    render(<LoginForm />);
    const user = userEvent.setup();
    
    // Act
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitBtn);
    
    // Assert
    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
  });
  
  // Anti-Pattern: Don't test internal state!
  // ❌ expect(component.state.isLoggedIn).toBe(true);
  // ✓ Test what the user sees instead
});`}</code>
        </pre>
      </div>
    </div>
  );
};

export default LoginFormDemo;

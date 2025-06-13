import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../frontend/src/pages/LoginPage';

describe('LoginPage', () => {
  it('renders the login form correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Check if the main title is there
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    // Check for input fields
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // Check for the login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});

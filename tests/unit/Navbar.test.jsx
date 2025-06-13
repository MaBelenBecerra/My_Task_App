import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../frontend/src/components/Navbar';
import * as AuthContext from '../../frontend/src/context/AuthContext';

describe('Navbar', () => {
  it('shows login and register links when user is not authenticated', () => {
    // Mock the useAuth hook to return an unauthenticated state
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ session: null });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  it('shows dashboard, categories, and logout when user is authenticated', () => {
    // Mock the useAuth hook to return an authenticated state
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ 
      session: { user: { id: '123' } },
      signOut: () => {}
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /categories/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
  });
});

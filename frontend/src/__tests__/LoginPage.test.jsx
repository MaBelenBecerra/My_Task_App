import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';

// Mock the supabase service to avoid initializing the client
vi.mock('../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

describe('LoginPage', () => {
  test('muestra el botón de Iniciar Sesión y el enlace para Registrarse', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Regístrate' })).toBeInTheDocument();
  });
});

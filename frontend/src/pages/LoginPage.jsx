import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 m-4">
        <h1 className="text-3xl font-bold text-center text-secondary mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">Correo Electrónico</label>
            <input
              id="email"
              className="w-full px-4 py-2 text-text-dark bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-text-dark mb-1">Contraseña</label>
            <input
              id="password"
              className="w-full px-4 py-2 text-text-dark bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-primary hover:bg-secondary text-text-light font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500 text-sm italic">{error}</p>}
        <p className="mt-6 text-center text-sm">
          ¿No tienes una cuenta? <Link to="/register" className="font-semibold text-secondary hover:text-accent">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

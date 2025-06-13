import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('¡Registro exitoso! Revisa tu correo para verificar la cuenta.');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-dark">REGISTER</h1>
          <div className="w-24 h-1 mx-auto mt-2 bg-secondary"></div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-text-dark bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-text-dark bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-accent text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            disabled={loading}
          >
            {loading ? 'REGISTRANDO...' : 'REGISTER'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-secondary hover:text-accent">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-secondary">My Task App</Link>
        <ul className="flex items-center space-x-6">
          {session ? (
            <>
              <li><Link to="/" className="font-semibold text-text-dark hover:text-secondary transition-colors">Mis Tareas</Link></li>
              <li><Link to="/categories" className="font-semibold text-text-dark hover:text-secondary transition-colors">Categorías</Link></li>
              <li>
              <button 
                  onClick={handleLogout}
                  className="bg-secondary text-black font-bold py-2 px-5 rounded-full hover:bg-accent transition-transform transform hover:scale-105 duration-300"
                >
                  Logout
                </button>
              </li>

            </>
          ) : (
            <>
              <li><Link to="/login" className="font-semibold text-text-dark hover:text-secondary transition-colors">Iniciar Sesión</Link></li>
              <li><Link to="/register" className="bg-secondary text-white font-bold py-2 px-5 rounded-full hover:bg-accent transition-transform transform hover:scale-105 duration-300">Registrarse</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

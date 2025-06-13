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
    <nav className="bg-primary shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-text-light">My Task App</Link>
        <ul className="flex items-center space-x-6">
          {session ? (
            <>
              <li><Link to="/" className="text-text-light hover:text-secondary font-semibold">Dashboard</Link></li>
              <li><Link to="/categories" className="text-text-light hover:text-secondary font-semibold">Categories</Link></li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="bg-secondary text-text-light font-bold py-2 px-4 rounded-lg hover:bg-accent transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="text-text-light hover:text-secondary font-semibold">Login</Link></li>
              <li><Link to="/register" className="bg-secondary text-text-light font-bold py-2 px-4 rounded-lg hover:bg-accent transition duration-300">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

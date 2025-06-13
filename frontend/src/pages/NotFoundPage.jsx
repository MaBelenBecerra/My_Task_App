import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-background px-4">
      <div className="max-w-md">
        <h1 className="text-8xl font-bold text-secondary">404</h1>
        <h2 className="mt-4 text-4xl font-bold text-text-dark">Página no encontrada</h2>
        <p className="mt-4 text-lg text-gray-600">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
        <Link 
          to="/" 
          className="mt-8 inline-block bg-primary hover:bg-secondary text-text-light font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

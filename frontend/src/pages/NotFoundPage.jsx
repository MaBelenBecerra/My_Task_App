import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="block text-gray-700 text-center text-2xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-700 text-base mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="text-pink-500 hover:text-pink-700">Go to Dashboard</Link>
      </div>
    </div>
  );
}

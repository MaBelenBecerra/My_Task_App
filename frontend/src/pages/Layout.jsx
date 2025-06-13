import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <div className="bg-background text-text-dark min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}

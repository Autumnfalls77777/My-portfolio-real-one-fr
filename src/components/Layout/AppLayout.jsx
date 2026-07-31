import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Layout/Footer';
import CustomCursor from '@/components/CustomCursor';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory px-4 sm:px-8 lg:px-12 overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
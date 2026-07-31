import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import Designs from './pages/Designs';
import DesignsGrid from './pages/DesignsGrid';
import BrandDetailPage from './pages/BrandDetailPage';
import Software from './pages/Software';
import Resume from './pages/Resume';
import Career from './pages/Career';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { AuthProvider } from './lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
        <ScrollToTop />
        <Routes>
          {/* Public pages inside AppLayout (with Navbar and Footer) */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/designs" element={<Designs />} />
            <Route path="/designs/grid" element={<DesignsGrid />} />
            <Route path="/designs/brands/:slug" element={<BrandDetailPage />} />
            <Route path="/software" element={<Software />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  </QueryClientProvider>
  );
}

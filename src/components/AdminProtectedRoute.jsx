import { Navigate } from 'react-router-dom';
import { isAdmin } from '@/lib/adminAuth';

export default function AdminProtectedRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
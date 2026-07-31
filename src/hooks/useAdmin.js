import { useState, useEffect } from 'react';
import { isAdmin } from '@/lib/adminAuth';

export function useAdmin() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    setAdmin(isAdmin());
  }, []);
  return admin;
}
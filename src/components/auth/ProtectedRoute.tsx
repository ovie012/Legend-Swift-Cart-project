import { Navigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '@/app/store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const itemCount = useCartStore((s) => s.getItemCount());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (itemCount === 0) return <Navigate to="/cart" replace />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;

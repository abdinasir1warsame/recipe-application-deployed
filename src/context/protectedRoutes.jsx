import { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = userAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Memoized user state to prevent unnecessary re-renders
  const isAuthenticated = useMemo(() => user !== null, [user]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/', { state: { openLoginModal: true } }, { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Block rendering while authentication is loading
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ml-0 lg:ml-64">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg mb-4 w-[100px] h-[100px]"></div>
          <p className="text-white text-4xl">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

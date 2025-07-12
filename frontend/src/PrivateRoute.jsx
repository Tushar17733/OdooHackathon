import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  if (loading) {
    // Optionally render a loading spinner or placeholder while checking auth status
    return <div className="text-center mt-8">Loading...</div>;
  }

  // If user is logged in, render the child routes, otherwise redirect to login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
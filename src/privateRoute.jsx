import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userInfo = sessionStorage.getItem('user');
  const loggedIn = !!userInfo; // Check if user data exists in session storage

  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Interventions from './Pages/interventions';
import Schools from './Pages/schools';
import Sessions from './Pages/sessions';
import Therapists from './Pages/therapists';
import Triggers from './Pages/triggers';
import NotFound from "./Pages/notfound";
import ProfileDetailsPage from "./Pages/profileDetail";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const userInfo = sessionStorage.getItem('user');
  const loggedIn = !!userInfo; // Check if user is logged in

  return loggedIn ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* Private Routes */}
      <Route
        path="/"
        element={

            <PrivateRoute>
            <Home />
          </PrivateRoute>

        }
      />
        <Route path="/profile/:profileId" element={<ProfileDetailsPage />} />
      <Route
        path="/interventions"
        element={
          <PrivateRoute>
            <Interventions />
          </PrivateRoute>
        }
      />
      <Route
        path="/schools"
        element={
          <PrivateRoute>
            <Schools />
          </PrivateRoute>
        }
      />
      <Route
        path="/sessions"
        element={
          <PrivateRoute>
            <Sessions />
          </PrivateRoute>
        }
      />
      <Route
        path="/therapists"
        element={
          <PrivateRoute>
            <Therapists />
          </PrivateRoute>
        }
      />
      <Route
        path="/triggers"
        element={
          <PrivateRoute>
            <Triggers />
          </PrivateRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;

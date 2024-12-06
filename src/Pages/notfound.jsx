// NotFound.js
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f8ff', color: '#00008b' }}>
      <h1 style={{ fontSize: '6em' }}>404</h1>
      <p style={{ fontSize: '1.5em' }}>Page Not Found</p>
      <Button variant="contained" color="primary" onClick={handleGoHome} startIcon={<FaHome />}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;

import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure this is the correct import
import App from './App';

// Create a root element to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

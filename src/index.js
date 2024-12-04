// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';  // Import your store
import App from './App';  // Your main app component

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

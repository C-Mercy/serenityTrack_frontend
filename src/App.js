import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar or other layout components */}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

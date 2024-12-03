import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login/>}/>
      <Route path ="/register" element={<Register/>}/>

      {/* <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;

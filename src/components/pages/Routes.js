// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default MainRoutes;

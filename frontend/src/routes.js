import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function RoutesFile(){
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token) navigate('/login');
  },[]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="*" element={<LoginPage/>}/>
    </Routes>
  );
}

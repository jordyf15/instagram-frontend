import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/register" element={<RegisterPage/>} />
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/profile" element={<ProfilePage/>}/>
        <Route exact path="/profile/edit" element={<EditProfilePage/>}/>
      </Routes>
    </Router>
  )
};

export default App;

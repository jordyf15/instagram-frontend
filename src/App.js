import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './view/HomePage';
import RegisterPage from './view/RegisterPage';
import LoginPage from './view/LoginPage';
import ProfilePage from './view/ProfilePage';
import './App.css';
import EditProfilePage from './view/EditProfilePage';

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

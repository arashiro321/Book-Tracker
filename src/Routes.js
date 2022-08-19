import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import BookRegistration from './pages/registration/BookRegistration'
import HomePage from './pages/homepage/Homepage.jsx'

export default () => {
    return(
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/bookregistration" element={<BookRegistration />} />
            <Route exact path="/homepage" element={<HomePage />} />
        </Routes>
    );
}
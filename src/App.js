// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OffersPage from './pages/OffersPage';
import AccountPage from './pages/AccountPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/offers"
                    element={<PrivateRoute component={OffersPage} />}
                />
                <Route
                    path="/account"
                    element={<PrivateRoute component={AccountPage} />}
                />
            </Routes>
        </Router>
    );
}

export default App;

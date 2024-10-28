// src/components/LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="bg-blue-900 text-white px-4 py-2 rounded-full mt-4">
            Logout
        </button>
    );
};

export default LogoutButton;
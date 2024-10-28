// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex justify-center p-4">
            <nav className="flex space-x-8">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? 'bg-blue-900 text-white px-4 py-2 rounded-full' : 'text-blue-900 hover:text-blue-600 px-4 py-2'
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/offers"
                    className={({ isActive }) =>
                        isActive ? 'bg-blue-900 text-white px-4 py-2 rounded-full' : 'text-blue-900 hover:text-blue-600 px-4 py-2'
                    }
                >
                    Offers
                </NavLink>
                <NavLink
                    to="/account"
                    className={({ isActive }) =>
                        isActive ? 'bg-blue-900 text-white px-4 py-2 rounded-full' : 'text-blue-900 hover:text-blue-600 px-4 py-2'
                    }
                >
                    Account
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;

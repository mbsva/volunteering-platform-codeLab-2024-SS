import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import emailIcon from '../assets/user.svg';
import passwordIcon from '../assets/password.svg';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password
            });
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/offers');
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message);
            setError('Invalid email or password');
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-800 font-sans">
            <div className="bg-blue-800 bg-opacity-40 p-8 rounded-lg shadow-2xl  sm:w-1/2 md:w-2/4 lg:w-1/3 xl:w-1/4 py-14">
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-center text-white mb-6 font-sans">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative flex items-center">
                        <img src={emailIcon} alt="Email Icon" className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10 w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                        />
                    </div>
                    <div className="relative flex items-center">
                        <img src={passwordIcon} alt="Password Icon" className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-10 w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs sm:text-sm md:text-base">{error}</p>}
                    <div className="text-right ">
                        <a href="/forgot-password" className="text-white hover:underline text-xxs sm:text-xs md:text-sm font-sans">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-200 to-blue-800 text-white font-bold rounded-full text-xs sm:text-sm md:text-base hover:text-black hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r transition-all font-sans">LOGIN</button>
                </form>
                <div className="text-center mt-2 font-sans">
                    <p className="text-white text-xxs sm:text-xs md:text-sm pt-2">Don't have an account yet? <Link to="/register" className="text-white underline hover:underline font-sans">Register</Link></p>
                    <p className="text-white text-xxs sm:text-xs md:text-sm pt-2">Or go back to <Link to="/" className="text-white underline font-sans hover:underline">Homepage</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

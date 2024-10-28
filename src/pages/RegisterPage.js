import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                name,
                email,
                password,
                contactInfo,
                description
            });
            console.log('Registration successful:', response.data);
            setSuccess('Registration successful. You can now log in.');
            setError('');
            // Redirect to login page after successful registration
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Error registering:', error.response?.data || error.message);
            setError('Registration failed. Please try again.');
            setSuccess('');
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-blue-800 font-sans">
            <div className="bg-blue-800 bg-opacity-40 p-8 rounded-lg shadow-2xl sm:w-1/2 md:w-2/4 lg:w-2/4 xl:w-1/4 ">
                <h2 className="text-2xl sm:text-2xl md:text-2.5xl lg:text-2.5xl font-bold text-center text-white mb-6">Register</h2>
                <form onSubmit={handleRegister} className="space-y-1">
                    <div>
                        <label htmlFor="name" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="pl-10  w-full p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10 w-full p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-10 w-full p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Phone Number:</label>
                        <input
                            type="text"
                            id="contactInfo"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            required
                            className="pl-10 w-full p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="pl-10 w-full p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-200 to-blue-800 text-white font-bold rounded-full drop-shadow-xl hover:text-black hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r transition-all">Register</button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-white text-xs sm:text-sm md:text-base">Already have an account? <Link to="/login" className="text-white underline hover:underline">Login</Link></p>
                    <p className="text-white text-xs sm:text-sm md:text-base">Or go back to <Link to="/" className="text-white underline hover:underline">Homepage</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

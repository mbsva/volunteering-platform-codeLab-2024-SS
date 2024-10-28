import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LogoutButton from '../components/LogoutButton';

const AccountPage = () => {
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        contactInfo: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from server
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.data) {
                    setUser(response.data);
                    console.log('User data fetched:', response.data);
                } else {
                    console.error('No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/update`, user, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage('Account updated successfully');
            setUser(response.data); // Update user state
            console.log('User data updated:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating account:', error);
            setMessage('Failed to update account');
        }
    };

    const handleDelete = async () => {
        try {
            console.log(user);
            const userId = user.id;
            if (!userId) {
                console.error('User ID is not defined');
                setMessage('Failed to delete account: User ID is not defined');
                return;
            }
            console.log(`Deleting user with ID: ${userId}`);
            await axios.delete(`${process.env.REACT_APP_API_URL}/auth/delete/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            localStorage.removeItem('token');
            navigate('/register');
        } catch (error) {
            console.error('Error deleting account:', error);
            setMessage('Failed to delete account');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-800 flex flex-col items-center">
            <Header />
            <div className="flex items-center justify-center pt-5 w-full max-w-sm">
                <div className="bg-blue-800 bg-opacity-40 p-8 rounded-lg shadow-2xl w-full max-w-sm max-h-screen overflow-y-auto">
                    {!isEditing ? (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">My Account</h2>
                                <button onClick={() => setIsEditing(true)} className="text-blue-900 underline hover:text-blue-700 transition-all text-lg">
                                    Edit Profile
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-white text-md"><strong>Name:</strong></p>
                                    <p className="text-white text-lg">{user.name}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-white text-md"><strong>Email:</strong></p>
                                    <p className="text-white text-md">{user.email}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-white text-md"><strong>Phone:</strong></p>
                                    <p className="text-white text-md">{user.contactInfo}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-white text-md"><strong>Description:</strong></p>
                                    <p className="text-white text-md">{user.description}</p>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <LogoutButton className=" px-6 bg-blue-950 text-white font-bold rounded-full hover:shadow-lg transition-all" />
                            </div>
                            <div className="flex justify-center mt-4">
                                <button onClick={handleDelete} className="py-2 px-6 bg-red-500 text-white font-bold rounded-full hover:shadow-lg transition-all">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="text-2xl sm:text-2xl md:text-2.5xl lg:text-2.5xl font-bold text-center text-white mb-3">Edit Profile</h2>
                            <div>
                                <label htmlFor="name" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contactInfo" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Phone:</label>
                                <input
                                    type="text"
                                    id="contactInfo"
                                    name="contactInfo"
                                    value={user.contactInfo}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="text-white mb-1 block text-xxs sm:text-xs md:text-sm">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={user.description}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-900 bg-opacity-80 text-xs sm:text-sm md:text-base"
                                />
                            </div>
                            {message && <p className="text-red-500">{message}</p>}
                            <button type="submit" className="w-full py-2 mt-4 bg-gradient-to-r from-green-200 to-blue-800 text-white font-bold rounded-full drop-shadow-xl hover:text-black hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r transition-all">Save</button>
                            <button onClick={() => setIsEditing(false)} className="w-full py-2 mt-2 bg-gray-500 text-white font-bold rounded-full hover:shadow-lg transition-all">Cancel</button> {/* Здесь изменено на mt-2 */}
                        </form>

                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;

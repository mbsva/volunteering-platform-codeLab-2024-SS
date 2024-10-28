import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Modal from '../components/Modal';

const OffersPage = () => {
    const [offers, setOffers] = useState([]);
    const [newOffer, setNewOffer] = useState({
        title: '',
        description: '',
        requiredSkills: '',
        location: '',
        date: '',
        contactInfo: '',
        status: 'open'
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/offers`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setOffers(response.data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    const handleCreateOffer = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/offers`, newOffer, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setOffers([...offers, response.data]);
            setNewOffer({
                title: '',
                description: '',
                requiredSkills: '',
                location: '',
                date: '',
                contactInfo: '',
                status: 'open'
            });
            setModalVisible(false);
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const handleUpdateOffer = async (event) => {
        event.preventDefault();
        if (!selectedOffer) return;
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/offers/${selectedOffer.id}`, newOffer, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setOffers(offers.map(offer => offer.id === selectedOffer.id ? response.data : offer));
            setNewOffer({
                title: '',
                description: '',
                requiredSkills: '',
                location: '',
                date: '',
                contactInfo: '',
                status: 'open'
            });
            setEditMode(false);
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating offer:', error);
        }
    };

    const handleEditOffer = (offer) => {
        setSelectedOffer(offer);
        setNewOffer({
            ...offer,
            date: offer.date.split('T')[0] // Ensure the date is in yyyy-MM-dd format
        });
        setEditMode(true);
        setModalVisible(true);
    };

    const handleDeleteOffer = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/offers/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setOffers(offers.filter(offer => offer.id !== id));
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-800 font-sans">
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl text-blue-900">All Offers</h1>
                    <button
                        onClick={() => {
                            setNewOffer({
                                title: '',
                                description: '',
                                requiredSkills: '',
                                location: '',
                                date: '',
                                contactInfo: '',
                                status: 'open'
                            });
                            setEditMode(false);
                            setModalVisible(true);
                        }}
                        className=" text-xl sm:text-xl md:text-2xl lg:text-2xl text-blue-900 p-2 hover:underline"
                    >
                        Add New Offer
                    </button>
                </div>
                <Modal isVisible={isModalVisible} onClose={() => {
                    setModalVisible(false);
                    setEditMode(false);
                    setSelectedOffer(null);
                }}>
                    <div className="bg-green-100 p-8 rounded-lg shadow-2xl mx-auto max-w-lg">
                        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">{editMode ? 'Update Offer' : 'Create an Offer'}</h2>
                        <form onSubmit={editMode ? handleUpdateOffer : handleCreateOffer} className="space-y-4">
                            <div>
                                <label className="text-blue-900 mb-1 block text-sm">Title:</label>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={newOffer.title}
                                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                                    className="w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-200 text-blue-900"
                                    required
                                />
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="text-blue-900 mb-1 block text-sm">Date:</label>
                                    <input
                                        type="date"
                                        placeholder="Date"
                                        value={newOffer.date}
                                        onChange={(e) => setNewOffer({ ...newOffer, date: e.target.value })}
                                        className="w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-200 text-blue-900"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-blue-900 mb-1 block text-sm">Location:</label>
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={newOffer.location}
                                        onChange={(e) => setNewOffer({ ...newOffer, location: e.target.value })}
                                        className="w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-200 text-blue-900"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="text-blue-900 mb-1 block text-sm">Status:</label>
                                    <select
                                        value={newOffer.status}
                                        onChange={(e) => setNewOffer({ ...newOffer, status: e.target.value })}
                                        className="w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-200 text-blue-900"
                                    >
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-blue-900 mb-1 block text-sm">Required skills:</label>
                                <input
                                    type="text"
                                    placeholder="Required skills"
                                    value={newOffer.requiredSkills}
                                    onChange={(e) => setNewOffer({ ...newOffer, requiredSkills: e.target.value })}
                                    className="w-full p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-200 text-blue-900"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-blue-900 mb-1 block text-sm">Description:</label>
                                <textarea
                                    placeholder="Description"
                                    value={newOffer.description}
                                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-200 text-blue-900"
                                    required
                                    rows="4"
                                />
                            </div>
                            <button type="submit" className="w-full py-2 bg-blue-900 text-white font-bold rounded-full drop-shadow-xl hover:bg-blue-800 transition-all">
                                {editMode ? 'Update Offer' : 'Save Offer'}
                            </button>
                        </form>
                    </div>
                </Modal>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {offers.map(offer => (
                        <div key={offer.id} className="bg-blue-800 bg-opacity-40 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <h2 className="text-xl font-bold text-white">{offer.title}</h2>
                            <p className="text-white line-clamp-5 text-xs mt-2">{offer.description}</p>
                            <div className="text-white mt-2">
                                <p><strong>Date: </strong>  {formatDate(offer.date)}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleEditOffer(offer)}
                                    className="bg-green-400 text-white p-2 px-4 rounded-full hover:text-black hover:scale-105 hover:shadow-xl transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteOffer(offer.id)}
                                    className="bg-blue-950 text-white p-2 rounded-full hover:text-black hover:scale-105 hover:shadow-xl transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OffersPage;

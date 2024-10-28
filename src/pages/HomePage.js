import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Modal from '../components/Modal';
import skillsIcon from '../assets/skills.svg'; // Импортируйте иконку навыков
import locationIcon from '../assets/location.svg'; // Импортируйте иконку локации
import dateIcon from '../assets/date.svg'; // Импортируйте иконку даты
import contactIcon from '../assets/phone.svg'; // Импортируйте иконку контактов
import statusIcon from '../assets/status.svg'; // Импортируйте иконку статуса


const HomePage = () => {
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchOffers();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredOffers(offers);
        } else {
            const filtered = offers.filter(offer =>
                offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                offer.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOffers(filtered);
        }
    }, [searchTerm, offers]);

    const fetchOffers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/homepage-offers`);
            setOffers(response.data);
            setFilteredOffers(response.data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    const handleOfferClick = (offer) => {
        setSelectedOffer(offer);
        setModalVisible(true);
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-800 font-sans">
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center mb-4 relative">
                    <input
                        type="text"
                        placeholder="Search by title or location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow w-full max-w-lg sm:max-w-xl lg:max-w-2xl px-3 py-2 rounded-3xl pr-10 bg-blue-950 opacity-60 relative"
                    />
                </div>
                <h1 className="text-xl mb-4 text-blue-900 text-left">All Offers</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredOffers.map(offer => (
                        <div key={offer.id} className="bg-green-200 p-4 rounded-2xl shadow-md hover:shadow-xl flex flex-col justify-between font-sans">
                            <h2 className="text-sm font-bold text-blue-900">{offer.title}</h2>
                            <p className="text-blue-900 line-clamp-4 text-xs mt-2">{offer.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-blue-900 font-extrabold text-xs">{offer.location}</p>
                                <button
                                    onClick={() => handleOfferClick(offer)}
                                    className="bg-blue-900 text-white font-bold text-xs px-3 py-1 rounded-full hover:shadow-hover:text-white hover:scale-105 hover:shadow-xl hover:blue-950 transition-all"
                                >
                                    VIEW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}
                       className="custom-modal"
                >
                    {selectedOffer && (
                        <div className="p-2 font-sans">
                            <h2 className="text-lg font-bold mb-2 text-blue-900 sm:text-base md:text-lg lg:text-lg">{selectedOffer.title}</h2>
                            <p className="text-xs sm:text-xxs md:text-xs lg:text-base mb-2 text-blue-950"><strong>Description: </strong>{selectedOffer.description}</p>
                            <p className="text-xs sm:text-xxs md:text-xs lg:text-base mb-2 flex items-center text-blue-950">
                                <img src={skillsIcon} alt="Required Skills Icon" className="text-blue-950 w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 mr-2 mt-2" />
                                <strong>Skills: </strong><span className="ml-1">{selectedOffer.requiredSkills}</span>
                            </p>
                            <p className="text-xs sm:text-xxs md:text-xs lg:text-base mb-2 flex text-blue-950 items-center">
                                <img src={locationIcon} alt="Location Icon" className=" text-blue-950 w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 mr-2" />
                                <strong>Location: </strong><span className="ml-1">{selectedOffer.location}</span>
                            </p>
                            <p className="text-xs sm:text-xxs md:text-xs lg:text-base mb-2 flex items-center text-blue-950">
                                <img src={dateIcon} alt="Date Icon" className="w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 mr-2 text-blue-950" />
                                <strong>Date: </strong><span className="ml-1">{formatDate(selectedOffer.date)}</span>
                            </p>
                            <p className="text-xs sm:text-xxs md:text-xs lg:text-base mb-2 flex items-center text-blue-950">
                                <img src={contactIcon} alt="Contact Info Icon" className="w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 mr-2 text-blue-950" />
                                <strong>Contact: </strong><span className="ml-1">{selectedOffer.contactInfo}</span>
                            </p>
                            <p className="text-xs sm:text-xxs md:text-xs lg:text-base mb-2 flex items-center text-blue-950">
                                <img src={statusIcon} alt="Status Icon" className="w-3 h-3 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 mr-2 text-blue-950" />
                                <strong>Status: </strong><span className="ml-1">{selectedOffer.status}</span>
                            </p>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default HomePage;

import React from 'react';
import closeIcon from '../assets/close.svg';

const Modal = ({ isVisible, onClose, children, className }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className={`bg-green-200 p-4 rounded shadow-md w-full max-w-lg max-h-full overflow-y-auto relative ${className}`}>
                <button onClick={onClose} className="absolute top-2 right-2">
                    <img src={closeIcon} alt="Close Icon" className="w-6 h-6 sm:w-5 sm:h-5 lg:w-8 lg:h-8" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

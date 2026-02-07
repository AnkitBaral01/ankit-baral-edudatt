"use client";

import React from 'react';

const ModalWrapper = ({ children, onClose, visible = false }) => {
    const handleOverlayClick = (e) => {
        e.stopPropagation();
        onClose();
    };

    if(!visible) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className="fixed inset-0 z-50 flex justify-center items-center mx-2 lg:mx-0"
                onClick={handleOverlayClick} // Add handler to detect clicks outside modal
            >
                <div
                    className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
                    onClick={(e) => e.stopPropagation()} // Prevent click inside modal content from closing
                >
                    <div className="relative">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-0 right-0 text-black font-extrabold hover:text-gray-800"
                        >
                            ✕
                        </button>

                        {/* Children Content */}
                        <div className="pt-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalWrapper;

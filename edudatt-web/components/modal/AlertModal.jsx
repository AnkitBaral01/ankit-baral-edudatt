"use client";

import React from 'react';
import ModalWrapper from '../hocs/ModalWrapper';
import LottiePlayer from '../LottiePlayer';
import Button from '../Button';

const AlertModal = ({ type, title, message, buttonText = "Okay", onButtonClick, onClose, visible }) => {
    const isSuccess = type === 'success';
    
    return (
        <ModalWrapper onClose={onClose} visible={visible}>
            <div className={`p-6 rounded-lg`}>
                {/* Icon */}
                <div className="flex justify-center mb-4 max-w-sm">
                    <LottiePlayer
                        animationData={isSuccess ? require("@/assets/lottie/success.json") : require("@/assets/lottie/error.json")}
                        className="object-contain w-32 h-32"
                        autoplay={true}
                        loop={false}
                    />
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>

                {/* Message */}
                <p className="text-center text-gray-700 mb-6">{message}</p>

                {/* Action Button */}
                <div className="text-center">
                    <Button
                        label={buttonText}
                        onClick={() => {
                            onButtonClick();
                            onClose();
                        }}
                        className={`${isSuccess ? "bg-yellow" : "bg-danger"} text-white py-2 px-4 font-semibold rounded-md min-w-60 hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105`}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default AlertModal;

"use client"

import React from 'react';
import LottiePlayer from './LottiePlayer';

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 z-10 pointer-events-auto"></div>
            <div className="z-20 pointer-events-none">
                <LottiePlayer
                    animationData={require("@/assets/lottie/loader.json")}
                    className="w-full h-auto aspect-square"
                />
            </div>
        </div>
    );
};

export default Loader;

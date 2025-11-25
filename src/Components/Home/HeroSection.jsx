import React from 'react';

const HeroSection = ({ backgroundImage, title }) => {
    return (
        <div className="relative h-[100vh]">
            <img
                className="w-full h-full object-cover"
                src={backgroundImage}
                alt="Étudiants travaillant ensemble"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <h1 className="mb-30 font-bold text-white text-3xl md:text-5xl text-center bg-white/10 p-6 rounded-2xl backdrop-blur-sm max-w-2xl mx-4">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;
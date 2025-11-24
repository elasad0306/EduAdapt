import React from 'react';

const HeroSection = ({ backgroundImage, title, buttonText, onButtonClick }) => {
    return (
        <div className="relative h-[120vh]">
            <img
                className="w-full h-full object-cover"
                src={backgroundImage}
                alt="Étudiants travaillant ensemble"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <h1 className="mt-10 font-bold text-white text-3xl md:text-5xl text-center bg-white/10 p-6 rounded-2xl mb-8 backdrop-blur-sm max-w-2xl mx-4">
                    {title}
                </h1>
                <button
                    className="cursor-pointer font-bold text-black text-xl md:text-2xl bg-white/80 px-8 py-4 rounded-2xl hover:bg-white hover:scale-105 transition duration-300 shadow-lg"
                    onClick={onButtonClick}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
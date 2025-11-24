import React from 'react';
import logo from '../../assets/picture/logoEduAdapt.png'; // Chemin vers votre logo

const Header = () => {
    return (
        <header className="w-full bg-white shadow-sm py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                        <img
                            src={logo}
                            alt="EduAdapt Logo"
                            className="w-50 h-50 object-contain"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
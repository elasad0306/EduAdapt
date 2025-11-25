import LogoWhite from '../assets/picture/logoEduAdaptWhiteVersion.png';
import Profile from '../assets/picture/profile.jpg';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleProfileClick = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        const token = localStorage.getItem('token');
        console.log('Token vérifié :', token);
        if (!token) {
            navigate('/Connexion');
        } else {
            navigate('/Profile');
        }
    };

    const handleChatClick = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        navigate('/Home');
    };

    return (
        <nav className="flex justify-between items-center bg-gray-800 p-2">
            <button onClick={handleChatClick} className="p-0">
                <img
                    src={LogoWhite}
                    alt="Logo"
                    className="h-15 cursor-pointer transition-transform duration-200 hover:scale-110"
                />
            </button>
            <div className="flex space-x-6">
                <button onClick={handleProfileClick} className="p-0">
                    <img
                        src={Profile}
                        alt="Profil"
                        className="h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
                    />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
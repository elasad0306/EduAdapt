import '../App.css'
import LogoWhite from '../assets/picture/logoEduAdaptWhiteVersion.png'
import Bell from '../assets/picture/bell.png'
import Profile from '../assets/picture/profile.jpg'
import Plus from '../assets/picture/plus.png'
import Execute from '../assets/picture/up-arrow.png'
import { useState, useRef } from 'react'

function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-gray-800 p-3 text-white">
            {/* Logo à gauche */}
            <a href="/Chat">
                <img
                    src={LogoWhite}
                    alt="Logo"
                    className="h-12 cursor-pointer transition-transform duration-200 hover:scale-110"
                />
            </a>

            {/* Icônes à droite */}
            <div className="flex space-x-6">
                <img
                    src={Bell}
                    alt="Notifications"
                    className="h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
                />
                <img
                    src={Profile}
                    alt="Profil"
                    className="h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
                />
            </div>
        </nav>
    );
}

function CenterInput() {
    const fileInputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [fileName, setFileName] = useState("");

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleExecute = () => {
        console.log("Texte :", inputValue);
        console.log("Fichier :", fileName);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-sky-100">
            {/* Carte contenant champ + boutons */}
            <div className="w-full max-w-md">
                <p className="mb-15 text-lg font-semibold text-gray-800">
                    Bonjour, comment puis-je vous aider aujourd'hui ?
                </p>
            </div>
            <div className="bg-white border rounded-lg shadow-lg p-1 w-full max-w-md flex flex-col">
                {/* Champ texte */}
                <input
                    type="text"
                    placeholder="Écrire quelque chose..."
                    className="rounded p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                {/* Zone boutons alignés en bas à gauche */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className="cursor-pointer p-1 border flex items-center justify-center w-10 h-10 rounded-full"
                    >
                        <img
                            src={Plus}
                            alt="Plus"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={handleExecute}
                        className="cursor-pointer"
                    >
                        <img
                            src={Execute}
                            alt="Execute"
                            className="h-10 border p-1 rounded cursor-pointer hover:scale-105 transition-transform duration-200 hover:bg-gray-100"
                        />
                    </button>
                </div>

                {/* Input file caché */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />

                {/* Nom du fichier choisi */}
                {fileName && (
                    <span className="text-sm text-gray-700 mt-2">Fichier : {fileName}</span>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <CenterInput />
        </div>
    );
}
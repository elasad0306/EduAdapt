import '../App.css'

import Plus from '../assets/picture/plus.png'
import Execute from '../assets/picture/up-arrow.png'
import { useState, useRef } from 'react'

import Navbar from '../Components/Navbar'
import { LoaderPinwheel } from 'lucide-react';

const API_URL = "http://localhost:8000/api"

function CenterInput() {
    const fileInputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState({
        success: false,
        message: ''
    })

    const [loader, setLoader] = useState(false)
    const [iaResponse, setIaResponse] = useState({
        theme : '',
        difficulty: '',
        resume: '',
        questions : ''
    })

    // const handleButtonClick = () => {
    //     fileInputRef.current.click();
    // };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    // const handleExecute = () => {
    //     console.log("Texte :", inputValue);
    //     console.log("Fichier :", fileName);
    // };

    async function chatAI() {
        try{
            setLoader(true)
            const response = await fetch(`${API_URL}/ia`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            console.log(data.success);
            
            console.log(data.result.theme);
            console.log(data.result.difficulty);
            

            if(data.success){
                setData({
                    success : data.success,
                    message : data.message
                })
                setIaResponse({
                    theme : data.result.theme,
                    difficulty : data.result.difficulty,
                    resume: data.result.resume
                })
            }
            
        }catch(error){
            console.error(error.message ||  'Erreur ');
            throw error
            
        }finally{
            setLoader(false)
        }
        
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-sky-100">
            {/* Carte contenant champ + boutons */}
            <div className="w-full max-w-md">
                <p className="mb-15 text-lg font-semibold text-gray-800">
                    Bonjour, comment puis-je vous aider aujourd'hui ?
                </p>
            </div>
            {loader && <LoaderPinwheel className='mx-auto animate-spin text-blue-500' />}
            {data.success && <div className='w-100 h-100'>
                <h1><strong>Thème : </strong>{iaResponse.theme}</h1>
                <h2><strong>Difficulté : </strong>{iaResponse.difficulty}</h2>
                <h3><strong>Résumé : </strong></h3>
                <div className='max-w-4xl mx-auto p-6  rounded-lg '>{iaResponse.resume}</div>
                <br/>
                </div>
                
            }
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="bg-white border rounded-lg shadow-lg p-4 w-full max-w-md flex flex-col">
                {/* Champ texte */}
                {/* <input
                    type="text"
                    placeholder="Écrire quelque chose..."
                    className="rounded p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                /> */}

                {/* Zone boutons alignés en bas à gauche */}
                <div className="flex justify-between">
                    {/* <button
                        type="button"
                        onClick={handleButtonClick}
                        className="cursor-pointer p-1 border flex items-center justify-center w-10 h-10 rounded-full"
                    >
                        <img
                            src={Plus}
                            alt="Plus"
                        />
                    </button> */}

                    <button
                        type="button"
                        onClick={chatAI}
                        className="cursor-pointer"
                    >
                        <img
                            src={Execute}
                            alt="Execute"
                            className="h-10 border p-1 rounded cursor-pointer hover:scale-105 transition-transform duration-200"
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
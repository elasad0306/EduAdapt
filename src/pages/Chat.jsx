import '../App.css'

import Plus from '../assets/picture/plus.png'
import Execute from '../assets/picture/up-arrow.png'
import { useState, useRef } from 'react'

import Navbar from '../Components/Navbar'
import { LoaderPinwheel, Send, Bug } from 'lucide-react';


const API_URL = "http://localhost:8000/api"

function CenterInput() {
    const fileInputRef = useRef(null);
    const [inputValue, setInputValue] = useState({
        input : ''
    });
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState({
        success: null,
        message: ''
    })

    const [loader, setLoader] = useState(false)
    const [iaResponse, setIaResponse] = useState({
        theme : '',
        difficulty: '',
        resume: '',
        questions : {
            question : '',
            type : '',
            options : '',
            response : ''
        }
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
            if(inputValue.input.trim() === ""){
                return (
                    alert("Veuillez retapez votre demande"),
                    window.location.href = "/Chat"
            )
            }
            setLoader(true)
            const response = await fetch(`${API_URL}/ia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValue)
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
                    resume: data.result.resume,
                    questions : {
                        question : data.result.questions.question,
                        type: data.result.questions.type,
                        options : data.result.questions.options,
                        response : data.result.questions.response

                    }
                })

                localStorage.setItem("responseIA", iaResponse)

                setInputValue({
                    input: ''
                })
            }
            
        }catch(error){
            setLoader(false)
            console.error(error.message ||  'Erreur ');
            throw error
            
        }finally{
            setLoader(false)
        }
        
    }
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 bg-sky-100">
            {/* Carte contenant champ + boutons */}
            <div className="w-full max-w-md">
                <h1 className="text-lg w-max text-center font-bold text-gray-800">
                    Hello, je suis là pour t'aider à réviser tes cours et à mieux les assimiler.
                </h1>
            </div>
            
            {loader && <LoaderPinwheel className='mx-auto animate-spin text-blue-500' size={64}/>}
            {data.success === false &&  <Bug />}
            {data.success && <div className='flex flex-col text-left w-100'>
                <h2><strong>Thème : </strong>{iaResponse.theme}</h2>
                <h2><strong>Résumé : </strong></h2>
                {iaResponse.resume}
                <br/>
                {/* <div>
                    {
                        iaResponse.questions.map()
                    }
                </div> */}
                </div>
                
            }
            <br/>
            
            <div className="flex flex-row justify-center align-center w-100  gap-3">
                {/* Champ texte */}
                <input
                    type="text"
                    placeholder="Écrire quelque chose..."
                    className="rounded p-2 shadow-sm active:border-sky-500 focus:outline-none focus:outline-sky-500 focus:ring-2 focus:ring-blue-300 mb-4 w-full"
                    value={inputValue.input}
                    onChange={(e) => setInputValue({input : e.target.value})}
                />
                

                {/* Zone boutons alignés en bas à gauche */}
                <div className="flex">

                    <button
                        type="button"
                        onClick={chatAI}
                        className="cursor-pointer pb-3"
                    >
                        <Send />
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
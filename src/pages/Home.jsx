import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HeroSection from '../components/Home/HeroSection';
import PatternSteps from '../components/Home/PatternSteps';
import Header from '../components/Home/Header';
import background_picture from '../assets/picture/doing-homework-together.jpg';
import Picture1 from '../assets/picture/member-log-membership-username-password-concept.jpg';
import Picture2 from '../assets/picture/business-hand-robot-handshake-artificial-intelligence-digital-transformation.jpg';
import Picture3 from '../assets/picture/personalisedexercise.jpg'
import Picture4 from '../assets/picture/profilepicture.jpg'
import Navbar from '../Components/Navbar';
import Footer from '../components/Footer';
import Button from '../Components/Buttons/Button';

function Home() {

    const [isConnected, setIsConnected] = useState(false)
    const [pathPage, setPathPage] = useState('')
    const checkIsConnected = ()=>{
        const token = localStorage.getItem('token')
        if(token){
            setIsConnected(true)
            setPathPage('/Chat')
        }else{
            setIsConnected(false)
            setPathPage('/Connexion')
        }
    }
    useEffect(()=>{
        checkIsConnected()
    }, [])
    const navigate = useNavigate();
    const stepsData = [
        {
            stepNumber: 1,
            title: "Inscription",
            description: "Inscrivez-vous ou connectez-vous pour accéder à votre espace étudiant personnel.",
            image: Picture1,
            imageAlt: "Inscription",
            color: "blue"
        },
        {
            stepNumber: 2,
            title: "Discussion IA",
            description: "Discutez avec notre intelligence artificielle, posez vos questions et recevez de l'aide instantanée.",
            image: Picture2,
            imageAlt: "Chat IA",
            color: "blue"
        },
        {
            stepNumber: 3,
            title: "Exercices personnalisés",
            description: "Effectuez des quizzs ou exercices pour vous entrainer",
            image: Picture3,
            imageAlt: "Notifications",
            color: "blue"
        },
        {
            stepNumber: 4,
            title: "Profil Étudiant",
            description: "Accédez à votre profil, modifiez vos informations et voyez vos résultats.",
            image: Picture4,
            imageAlt: "Profil étudiant",
            color: "blue"
        }
    ];

    return (


        <div className="w-full h-full overflow-auto">
            
            <Navbar/>

            <HeroSection
                backgroundImage={background_picture}
                title="De vos cours à la réussite... en un clic."
                // On retire le bouton de la HeroSection
            />

            
            <Header />

            
            <PatternSteps stepsData={stepsData} />

            <div className="w-full bg-linear-to-br bg-sky-100 py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                        Prêt à apprendre ?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers d'étudiants qui ont déjà transformé leur façon d'apprendre avec EduAdapt
                    </p>
                    <Button 
                    NameButton="Commencer maintenant" 
                    onClick={() => navigate(pathPage)}
                    style="cursor-pointer font-bold text-white text-xl bg-linear-to-r from-blue-500 to-blue-600 px-10 py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"/
                    >
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
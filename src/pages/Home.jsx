import React from 'react';
import { useNavigate } from 'react-router';
import HeroSection from '../components/Home/HeroSection';
import ZPatternSteps from '../components/Home/ZPatternSteps';
import Header from '../components/Home/Header';
import background_picture from '../assets/picture/doing-homework-together.jpg';
import Picture1 from '../assets/picture/member-log-membership-username-password-concept.jpg';
import Picture2 from '../assets/picture/business-hand-robot-handshake-artificial-intelligence-digital-transformation.jpg';
import Picture3 from '../assets/picture/personalisedexercise.jpg'
import Picture4 from '../assets/picture/profilepicture.jpg'

function Home() {
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
            color: "green"
        },
        {
            stepNumber: 3,
            title: "Exercices personnalisés",
            description: "Effectuez des quizzs ou exercices pour vous entrainer",
            image: Picture3,
            imageAlt: "Notifications",
            color: "yellow"
        },
        {
            stepNumber: 4,
            title: "Profil Étudiant",
            description: "Accédez à votre profil, modifiez vos informations et voyez vos résultats.",
            image: Picture4,
            imageAlt: "Profil étudiant",
            color: "purple"
        }
    ];

    return (
        <div className="w-full h-full overflow-auto">

            <HeroSection
                backgroundImage={background_picture}
                title="De vos cours à la réussite... en un clic."
                buttonText="Commencer maintenant"
                onButtonClick={() => navigate("/Connexion")}
            />
            <Header />
            <ZPatternSteps stepsData={stepsData} />
        </div>
    );
}

export default Home;
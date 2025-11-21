import InputWithLabel from '../components/InputWithLabel/InputWithLabel';
import Button from '../Components/Buttons/Button';
import Navbar from '../Components/Navbar' 
import { Link } from 'react-router';


function Registration() {
    return (
        <>
        <Navbar />
        <div className="sky-blue-bg min-h-screen flex items-center justify-center text-black">
            <form className="form-card bg-white border-gray-900 border p-6 flex flex-col space-y-4 w-150" action="" method="POST">
                <h1 className="text-2xl font-semibold text-center">Inscription</h1>
                <InputWithLabel NameLabel="Nom*" idInput="name" style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"/>
                <InputWithLabel NameLabel="Prénom*" idInput="firstname" style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"/>
                <InputWithLabel NameLabel="Email*" idInput="email" style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"/>
                <InputWithLabel NameLabel="Adresse" idInput="address" style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"/>
                <InputWithLabel NameLabel="Téléphone" idInput="phoneNumber" style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"/>
                <InputWithLabel NameLabel="Mot de passe*" idInput="password" style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"/>
                <p className="text-sm">* Champs obligatoires</p>
                <div className="flex justify-center align-center">
                    <Button NameButton="S'inscrire" style="cursor-pointer transition duration-300 border border-green-300 w-max  text-green-300 p-2 rounded hover:bg-green-300 hover:text-white"/>
                </div>
                
                <div className="text-center">
                    <p>Déjà un compte ? <Link to="/Connexion"><span className="text-blue-400 hover:underline">Connectez-vous ici</span></Link></p>
                </div>
            </form>
        </div>
        </>
    );
}

export default Registration;
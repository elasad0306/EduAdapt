import Button from "../Components/Buttons/Button"
import InputWithLabel from "../components/InputWithLabel/InputWithLabel"
import Navbar from '../Components/Navbar' 
import { Link } from 'react-router';

function Connexion(){
    return(
        <>
        <Navbar />
            <div className="sky-blue-bg h-screen flex items-center justify-center pb-50 text-black">
                <form
                    className="bg-white border border-gray-900 p-6 flex-col space-y-4 w-full max-w-md rounded shadow-lg"
                >
                    <h1 className="text-2xl font-semibold text-center">Connexion</h1>

                    <InputWithLabel
                        NameLabel="E-mail"
                        idInput="email"
                        style="input-shadow border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2"
                    />

                    <InputWithLabel
                        NameLabel="Mot de passe"
                        idInput="password"
                        style="input-shadow border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2"
                    />

                    <div className="flex justify-center">
                        <Button
                            NameButton="Se connecter"
                            style="cursor-pointer transition duration-300 border border-green-300 w-max text-green-300 p-2 rounded hover:bg-green-300 hover:text-white"
                        />
                    </div>

                    <div className="text-center">
                        <p>
                            Pas de compte ?
                            <Link to="/Registration">
                                <span className="text-blue-400 hover:underline"> S'inscrire</span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

        </>
    )
}
export default Connexion
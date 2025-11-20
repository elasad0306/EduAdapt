import Logo from '../assets/picture/logoEduAdapt.png'
import background_picture from '../assets/picture/home_picture.jpg'
import Button from '../Components/Buttons/Button'
import { useNavigate } from 'react-router'

function Home(){
    const navigate = useNavigate()
    return(
        <div className="relative overflow-hidden h-screen">
            <img
                className="w-full h-screen object-cover"
                src={background_picture}
                alt="background"/>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img className="mx-auto -mt-20" src={Logo} alt="logo" />

                <h1 className="mt-10 font-bold text-white text-3xl bg-white/20 p-2 rounded-2xl mb-8">
                    De vos cours à la réussite... en un clic.
                </h1>

                <button
                    className="cursor-pointer font-bold text-black text-2xl bg-white/40 px-6 py-2 rounded-2xl hover:bg-white/60 transition duration-300"
                    onClick={() => navigate("/Connexion")}>
                    Se connecter
                </button>
            </div>
        </div>
    )
}
export default Home
import Logo from '../assets/picture/logoEduAdapt.png'
import background_picture from '../assets/picture/home_picture.jpg'
import Button from '../Components/Buttons/Button'
import { useNavigate } from 'react-router'

function Home(){
    const navigate = useNavigate()
    return(
        <div className="overflow-hidden">
            <div className="flex flex-col items-center">
                    <img className="m-0 h-100vh bg-cover relative" src={background_picture} alt="background"></img>
                <div className="absolute bottom-80">
                    <img className="mx-auto" src={Logo} alt="logo"></img>
                    <h1 className="mt-10 font-bold text-white text-3xl  p-1 rounded-2xl ">De vos cours à la réussite... en un clic.</h1>
                    <div className="flex justify-center align-center"><Button NameButton="Se connecter" style=" p-3 bg-gray-200 rounded-lg " onClick={()=>navigate("/Registration")}/></div>
                </div>
            </div>
        </div>
    )
}
export default Home
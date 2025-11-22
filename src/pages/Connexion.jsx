import Button from "../Components/Buttons/Button"
import InputWithLabel from "../components/InputWithLabel/InputWithLabel"
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import {useState}  from 'react'
const API_URL = 'http://localhost:8000/api'

function Connexion(){
    const navigate = useNavigate()
    const [informationEnter, setInformationEnter] = useState({
        email: '',
        password: ''
    })
    const [data, setData] = useState({
        success: false,
        message: ''
    })

    function handleChange(e){
        const {name, value} = e.target
        setInformationEnter(prev =>({
            ...prev,
            [name]:value
        }))
    }
    async function connectUser (event){
        if(event){
            event.preventDefault()
        }
        try{
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(informationEnter) 
            })

            const data = await response.json()

            setData({
                success: data.success,
                message: data.message
            })
            if(data.success == true){
                return (
                    setInformationEnter({
                        email: '',
                        password: ''
                    }),
                    navigate('/Chat')
                )
            }
            if(!response.ok){
                throw new Error (data.message || 'Erreur lors de l\'inscription')
            }
        }catch(error){
            console.error('Erreur inscription:', error);
            throw error
        }
    }
    return(
        <>
        {/* <Navbar /> */}
        <div className=" sky-blue-bg min-h-screen flex items-center justify-center text-black">
            <form className="form-card border-gray-900 border p-6 flex flex-col rounded space-y-4 w-150" onSubmit={connectUser}>
            <h1 className="text-2xl font-semibold text-center">Connexion</h1>
            <InputWithLabel 
            NameLabel="E-mail" 
            idInput="email" 
            value={informationEnter.email}
            style="input-shadow border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2"
            onChange={handleChange}
            typeInput="text"
            />

            <InputWithLabel 
            NameLabel="Mot de passe" 
            idInput="password" 
            value={informationEnter.password}
            style="input-shadow border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2"
            onChange={handleChange}
            typeInput="password"
            />
            {!data.success && (<div><p className='text-red-500'> {data.message}</p></div>)}
            <div className="flex justify-center align-center"> 
                <Button 
                NameButton="Se connecter" 
                style="cursor-pointer transition duration-300 border border-green-300 w-max  text-green-300 p-2 rounded hover:bg-green-300 hover:text-white"/>
            </div>
            
            <div className="text-center">
                <p>Pas de compte ? <Link to="/Registration"><span className="text-blue-400 hover:underline">S'inscrire </span></Link></p>
            </div>
            </form>
        </div>
        </>
    )
}
export default Connexion
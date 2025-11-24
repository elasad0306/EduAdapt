import InputWithLabel from '../components/InputWithLabel/InputWithLabel';
import Button from '../Components/Buttons/Button';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { useState } from 'react';
const API_URL = 'http://localhost:8000/api'


function Registration() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        success: false,
        message: ''
    })
    const  [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phonenumber: '',
        password: '',

    })

    function handleChange(e){
        const {name, value} = e.target
        setUserData(prev =>({
            ...prev,
            [name]:value
        }))
    }
    async function registerUser (event) {
        if(event){
            event.preventDefault()
        }
        try{
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()

            setData({
                success: data.success,
                message: data.message
            })

            if(data.success === true){
                return (
                    localStorage.setItem('token', data.data.tokenUser),
                    setUserData({
                        firstname: '',
                        lastname: '',
                        email: '',
                        address: '',
                        phonenumber: '',
                        password: '',
                    }),
                    navigate('/Chat')
                )
            }

            if(!response.ok){
                throw new Error (data.message || 'Erreur lors de l\'inscription')
            }
            return data
        }catch(error){
            console.error('Erreur inscription:', error);
            throw error
            
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center sky-blue-bg text-black">
            <form className="bg-white border-gray-900 border p-6 flex flex-col space-y-4 w-150 rounded" onSubmit={registerUser}>
                <h1 className="text-2xl font-semibold text-center">Inscription</h1>
                <InputWithLabel 
                NameLabel="Nom*" 
                idInput="lastname" 
                value={userData.lastname}
                style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"
                onChange={handleChange}
                typeInput="text"
                />


                <InputWithLabel 
                NameLabel="Prénom*" 
                idInput="firstname" 
                value={userData.firstname}
                style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"
                onChange={handleChange}
                typeInput="text"
                />

                <InputWithLabel 
                NameLabel="Email*" 
                idInput="email" 
                value={userData.email}
                style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"
                onChange={handleChange}
                typeInput="email"
                />

                <InputWithLabel 
                NameLabel="Adresse" 
                idInput="address"
                value={userData.address} 
                style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"
                onChange={handleChange}
                typeInput="text"
                />

                <InputWithLabel 
                NameLabel="Téléphone" 
                idInput="phonenumber"
                value={userData.phonenumber} 
                style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"
                onChange={handleChange}
                typeInput="text"
                />

                <InputWithLabel 
                NameLabel="Mot de passe*" 
                idInput="password" 
                value={userData.password}
                style="border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow"
                onChange={handleChange}
                typeInput="password"
                />
                <p className="text-sm">* Champs obligatoires</p>
                {!data.success && (<div><p className='text-red-500'> {data.message}</p></div>)}
                <div className="flex justify-center align-center">
                    <Button NameButton="S'inscrire" type="submit" style="cursor-pointer transition duration-300 border border-green-300 w-max  text-green-300 p-2 rounded hover:bg-green-300 hover:text-white"/>
                </div>
                
                <div className="text-center">
                    <p>Déjà un compte ? <Link to="/Connexion"><span className="text-blue-400 hover:underline">Connectez-vous ici</span></Link></p>
                </div>
            </form>
        </div>
    );
}

export default Registration;
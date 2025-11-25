import {useEffect, useState } from 'react';
import '../App.css'
import Button from '../Components/Buttons/Button';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import profileImg from '../assets/picture/profil_utilisateur.png';
const API_URL = 'http://localhost:8000/api'
function Profile(){
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        emai: '',
        address: '',
        phonenumber: '',

    })
    const getProfile = async () =>{
        try{
            const token = localStorage.getItem('token')
            // console.log('Token récupéré:', token);

            if(!token){
                throw new Error('Utilisateur non connecté')
            }

            const response = await fetch(`${API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                    
            })
            // console.log('Réponse HTTP:', response.status, response.statusText);
            const data = await response.json()
            // console.log(data);
            

            if(!data){
                throw new Error(data.message || 'Erreur durant la récupération du profil')
            }
            return data
        }catch(error){
            console.error('Erreur profil : ', error)
            throw error
        }
    }
    useEffect(() =>{
        const displayProfile = async () =>{
            try{
                const result = await getProfile()

                setUser({
                    firstname: result.data.user.firstname,
                    lastname: result.data.user.lastname,
                    email: result.data.user.email,
                    address: result.data.user.address,
                    phonenumber: result.data.user.phonenumber,
                })
            }catch(error){
                throw new Error (error.message || 'Erreur lors du chargement de profil')
            }
        }
        displayProfile()
    }, [])
    const deconnexion = () =>{
        localStorage.removeItem('token')
        window.location.href = '/';
    }
    return(
        <>
        <Navbar />
                <div
                    className="flex flex-row p-6 rounded-lg shadow-lg bg-cover bg-center bg-sky-100"                >
                    <div className="flex flex-col items-center basis-1/3">
                        <img
                    src={profileImg}
                    alt="Profile"
                    className="w-60 h-60 rounded-full object-cover border-4 border-white shadow-lg mt-6"
                    />
                        <h2 className="text-xl font-semibold mt-4">{user.firstname} {user.lastname}</h2>  
                        <Button onClick={deconnexion} NameButton="Se déconnecter" style=" mt-4 py-2 px-9 cursor-pointer transition duration-300 border border-red-300 text-red-300  rounded hover:bg-red-300 hover:text-white"/>
                    </div>
                    <div className="flex flex-col basis-2/3 ml-4 bg-white p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl text-center mt-4">Profil Utilisateur</h1>
                        <div className="mt-4 mb-6 space-y-3 text-xl">
                            <p> Nom: {user.lastname}</p>
                            <p> Prénom: {user.firstname}</p>
                            <p> Email: {user.email}</p>
                            <p> Address: {user.address || 'Non renseigné'}</p>
                            <p> Contact: {user.phonenumber || 'Non renseigné'}</p>
                        </div>
                        <div className="flex justify-end">
                            <a href="/Modifprofile">
                                <Button NameButton="Modifier" style=" py-2 px-9 cursor-pointer transition duration-300 border border-blue-300 text-blue-300  rounded hover:bg-blue-300 hover:text-white"/>               
                            </a>
                        </div>
                    </div>
                </div>

        <Footer />
        </>
    )
}
export default Profile
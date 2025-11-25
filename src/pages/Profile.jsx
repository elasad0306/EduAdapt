import {useEffect, useState } from 'react';
import '../App.css'
import Button from '../Components/Buttons/Button';
import Footer from '../components/Footer';
import Navbar from "../Components/Navbar";
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
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center max-h-screen sm:p-6 lg:p-20 bg-sky-100">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">

                        <div className="flex flex-col items-center p-6 lg:p-8 bg-linear-to-b from-blue-50 to-sky-100 lg:w-1/3">
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-center text-gray-800">
                                {user.firstname} {user.lastname}
                            </h2>
                            <div className="mt-4 w-full max-w-xs">
                                <Button
                                    onClick={deconnexion}
                                    NameButton="Se déconnecter"
                                    style="w-full py-2 px-4 cursor-pointer transition duration-300 border border-red-400 text-red-400 rounded-lg hover:bg-red-400 hover:text-white font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col p-6 lg:p-8 lg:w-2/3">
                            <h1 className="font-bold text-2xl sm:text-3xl text-center lg:text-left text-gray-800 mb-6">
                                Informations de profil
                            </h1>

                            <div className="space-y-4 sm:space-y-5 mb-8">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-gray-600 font-medium min-w-24 sm:min-w-32">Nom:</span>
                                    <span className="text-gray-800 font-semibold sm:ml-4">{user.lastname}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-gray-600 font-medium min-w-24 sm:min-w-32">Prénom:</span>
                                    <span className="text-gray-800 font-semibold sm:ml-4">{user.firstname}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-start">
                                    <span className="text-gray-600 font-medium min-w-24 sm:min-w-32">Email:</span>
                                    <span className="text-gray-800 font-semibold sm:ml-4 break-words">{user.email}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-gray-600 font-medium min-w-24 sm:min-w-32">Adresse:</span>
                                    <span className="text-gray-800 font-semibold sm:ml-4">{user.address || 'Non renseigné'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="text-gray-600 font-medium min-w-24 sm:min-w-32">Contact:</span>
                                    <span className="text-gray-800 font-semibold sm:ml-4">{user.phonenumber || 'Non renseigné'}</span>
                                </div>
                            </div>

                            <div className="flex justify-center lg:justify-end mt-4">
                                <a href="/Modifprofile" className="w-full sm:w-auto">
                                    <Button
                                        NameButton="Modifier le profil"
                                        style="w-full py-3 px-8 cursor-pointer transition duration-300 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white font-medium"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Profile
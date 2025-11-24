import { useEffect, useState } from 'react';
import '../App.css'
import Button from '../Components/Buttons/Button';
import Footer from '../Components/Footer';
import Navbar from "../Components/Navbar";
import profileImg from '../assets/picture/profil_utilisateur.png';
const API_URL = 'http://localhost:8000/api'
function Profile(){
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phonenumber: ''
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
            const text = await response.text()
            try{
                const data = JSON.parse(text)
                return data
            }catch(err){
                console.error('Réponse non-JSON reçue du serveur:', text)
                throw new Error('Réponse non-JSON reçue du serveur')
            }
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
                <div className="flex flex-col p-6 rounded-lg shadow-lg bg-cover bg-center mt-6 mb-6">
                    <h2 className="text-center mt-6 text-2xl mb-6"> Historique D'activités</h2>
                    <table className="border-separate border border-gray-400 mt-4 mb-6">
                        <thead>
                            <tr>
                            <th className="border border-gray-300 px-6 py-3 ">Cours</th>
                            <th className="border border-gray-300 px-6 py-3 ">Impression</th>
                            <th className="border border-gray-300 px-6 py-3 ">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="border border-gray-300 px-6 py-3 ">Anglais</td>
                            <td className="border border-gray-300 px-6 py-3 ">Moyen</td>
                            <td className="border border-gray-300 px-6 py-3 ">10</td>
                            </tr>
                            <tr>
                            <td className="border border-gray-300 px-6 py-3 ">Mathématiques</td>
                            <td className="border border-gray-300 px-6 py-3 ">Assez Bien</td>
                            <td className="border border-gray-300 px-6 py-3 ">15</td>
                            </tr>
                            <tr>
                            <td className="border border-gray-300 px-6 py-3 ">Informatique</td>
                            <td className="border border-gray-300 px-6 py-3 ">Excellent !</td>
                            <td className="border border-gray-300 px-6 py-3 ">17</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className="text-center mt-6 text-2xl mb-6">Demander de l'aide</h2>
                    <div className="text-center px-60 py-6 bg-cover bg-center bg-sky-100 ">
                            <p>
                                Besoin d'un coup de pouce ? Envoyez votre demande et entrez en contact
                                avec des étudiant·es ou des tuteurs disponibles, localement ou à distance.
                                <br />
                                Organisez des sessions d'étude, partagez des ressources et progressez
                                ensemble — la communauté EduAdapt vous accompagne à chaque étape.
                            </p>
                    </div>
                </div>
                <div className="flex justify-center mt-4 mb-10">
                    <a href="/Aide">
                        <Button NameButton="Demander de l'aide" style="py-2 px-9 cursor-pointer transition duration-300 border border-yellow-300 text-yellow-300  rounded hover:bg-yellow-300 hover:text-white"/>
                    </a>
                </div>
        <Footer />
        </>
    )
}
export default Profile
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../components/Footer'
import InputWithLabel from '../components/InputWithLabel/InputWithLabel'
import Button from '../Components/Buttons/Button'

const API_URL = 'http://localhost:8000/api'

function Modifprofile(){
	const [form, setForm] = useState({
		firstname: '',
		lastname: '',
		address: '',
		phonenumber: '',
        password: ''
	})
	const [loading, setLoading] = useState(false)

	const parseResponseSafely = async (res) => {
		const text = await res.text()
		try{
			return JSON.parse(text)
		}catch(err){
			console.error('Réponse non-JSON reçue du serveur:', err)
			throw new Error('Réponse non-JSON reçue du serveur')
		}
	}

	const getProfile = async () =>{
		try{
			const token = localStorage.getItem('token')
			if(!token) throw new Error('Utilisateur non connecté')

			const response = await fetch(`${API_URL}/profile`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
			})
			const data = await parseResponseSafely(response)
			if(!data || !data.data) throw new Error(data && data.message ? data.message : 'Impossible de récupérer le profil')

			const user = data.data.user
			setForm({
				firstname: user.firstname || '',
				lastname: user.lastname || '',
				address: user.address || '',
				phonenumber: user.phonenumber || '',
                email: user.email || '',
                password: '' 
			})
		}catch(error){
			console.error('Erreur profil : ', error)
		}
	}

	useEffect(()=>{
		getProfile()
	}, [])

	const handleChange = (e) =>{
		setForm(prev => ({...prev, [e.target.name]: e.target.value}))
	}

	const handleSubmit = async (e) =>{
		e.preventDefault()
		setLoading(true)
		try{
			const token = localStorage.getItem('token')
			if(!token) throw new Error('Utilisateur non connecté')

			const payload = {
				firstname: form.firstname,
				lastname: form.lastname,
				address: form.address,
				phonenumber: form.phonenumber,
                email: form.email,
                password: form.password || undefined
			}

			const res = await fetch(`${API_URL}/Modifprofile`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})

			const data = await parseResponseSafely(res)
			if(!data || !data.success){
				throw new Error(data && data.message ? data.message : 'Erreur lors de la sauvegarde')
			}

			alert('Profil mis à jour avec succès')
			window.location.href = '/Profile'
		}catch(error){
			console.error('Erreur lors de la mise à jour :', error)
			alert(error.message || 'Erreur lors de la mise à jour')
		}finally{ setLoading(false) }
	}

	return (
		<>
		<Navbar />
		<div className="flex items-center flex-col bg-sky-100 mx-auto p-6 rounded-lg shadow-lg">
			<h1 className="text-2xl mb-4 text-center">Modifier mon profil</h1>
			<div className="flex gap-6">
				<form className="flex items-center flex-col bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
					<InputWithLabel 
                        NameLabel="Prénom*" 
                        idInput="firstname" 
                        value={form.firstname}
                        style="border w-100 rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow mb-4"
                        onChange={handleChange}
                        typeInput="text"
                    />
					<InputWithLabel 
                        NameLabel="Nom*" 
                        idInput="lastname" 
                        value={form.lastname}
                        style="border w-100 rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow mb-4"
                        onChange={handleChange}
                        typeInput="text"
                    />
					<InputWithLabel 
                        NameLabel="Adresse" 
                        idInput="address" 
                        value={form.address}
                        style="border w-100 rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow mb-4"
                        onChange={handleChange}
                        typeInput="text"
                    />
					<InputWithLabel 
                        NameLabel="Numéro de téléphone" 
                        idInput="phonenumber" 
                        value={form.phonenumber}
                        style="border w-100 rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow mb-4"
                        onChange={handleChange}
                        typeInput="text"
                    />
                    <InputWithLabel 
                        NameLabel="Email*" 
                        idInput="email" 
                        value={form.email}
                        style="border w-100 rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow mb-4"
                        onChange={handleChange}
                        typeInput="text"
                    />
                    <InputWithLabel 
                        NameLabel="Mot de passe*" 
                        idInput="password" 
                        value={form.password}
                        style="border w-100 rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-2 input-shadow mb-4"
                        onChange={handleChange}
                        typeInput="password"
                    />
                    <div className="flex flex-row gap-20">
                    <div className="flex mt-5">
                        <a href="/Profile" className="px-6 flex-1 py-2 text-center border border-gray-300 rounded-lg hover:bg-red-700 hover:tet-white transition">Annuler</a>
                    </div>
					<div className="flex mt-5">
						<Button NameButton={loading ? 'Enregistrement...' : 'Enregistrer'} style="py-2 px-6 cursor-pointer transition duration-300 border border-blue-700 text-blue-700  rounded hover:bg-blue-700 hover:text-white"/>
					</div>
                    </div>
				</form>
			</div>
		</div>
		<Footer />
		</>
	)
}

export default Modifprofile
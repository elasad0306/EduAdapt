const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const tokenGenerator = (id) =>{
    return jwt.sign({id}, 'secret', {expiresIn: '30d'})
}

router.post('/api/register', async (req, res) =>{
    try {
        console.log("Donnée reçu", req.body) 

        const {firstname, lastname, email, address, phonenumber, password} = req.body

        if(!firstname || !lastname || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Tous les champs (nom, prénom, email et mot de passe) sont requis'
            })
        }
        
        if(password.length < 8 ){
            return res.status(400).json({
                success: false,
                message: 'Le mot de passe doit contenir au moins 8 caractères'
            })
        }
        const checkMail = await User.checkEmailExist(email)

        if(checkMail){
            res.status(400).json({
                success: false,
                message: "Cet e-mail existe déjà "
            })
        }
        const user = await User.createUser({
            firstname,
            lastname,
            email,
            address,
            phonenumber,
            password
        })

        const tokenUser = tokenGenerator(user.id)

        res.status(201).json({
            success: true,
            message: 'Compte crée avec succès',
            data: {
                user : {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                },
                tokenUser
            }
        })
    }catch(error){
        console.error('Erreur inscription : ', error);
        
        res.status(500).json({
            success: false,
            message: error.message || "Erreur lors de l\'inscription"
        })
    }
})
router.post('/api/login', async(req, res) =>{
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Veuillez remplir les deux champs"
            })
        }

        const user = await User.findEmail(email)

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            })
        }
        const isPasswordValid = await User.comparePassword(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Email ou mot de passe incorrect"
            })
        }

        const tokenUser = tokenGenerator(user.id)
        res.status(201).json({
            success: true,
            message: "Vous êtes désormais connecté",
            data: {
                user : {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                    phonenumber: user.phonenumber
                }, 
                tokenUser
            }
        })
    }catch(error){
        console.error('Erreur inscription : ', error);
        
        res.status(500).json({
            success: false,
            message: error.message || "Erreur lors de la connexion"
        })
    }
})


router.get('/api/profile', async (req, res) => {
    try {
        
        // Récupération du token depuis les headers
        const authHeader = req.headers.authorization;
        // console.log('Authorization header:', authHeader);

        if (!authHeader) {
            // console.log('Authorization header manquant');
            return res.status(401).json({
                success: false,
                message: 'Token manquant'
            });
        }

        // Extraction du token
        const token = authHeader.startsWith('Bearer') ? authHeader.slice(7) : authHeader;

        // console.log('Token extrait:', token);

        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({
                success: false,
                message: 'Token invalide'
            });
        }

        // Pour vérifier le token récupéré
        const decoded = jwt.verify(token, 'secret');
        // console.log('Token décodé:', decoded);

        //Pour rechercher l'utilisateur selon id , récupéré dans la le token
        const user = await User.findByID(decoded.id);
        // console.log('Utilisateur trouvé:', user);

        if (!user) {
            // console.log('Utilisateur non trouvé pour ID:', decoded.id);
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profil récupéré avec succès',
            data: {
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address || '',
                    phonenumber: user.phonenumber || ''
                }
            }
        })

    } catch (error) {
        console.error('Erreur :', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Erreur serveur'
        });
    }
})
router.put('/api/Modifprofile', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token manquant'
            });
        }
        const token = authHeader.startsWith('Bearer') ? authHeader.slice(7) : authHeader;
        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({
                success: false,
                message: 'Token invalide'
            });
        }
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findByID(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }
        const { firstname, lastname, address, phonenumber, email, password } = req.body;
        const updatedUser = await User.updateUser(decoded.id, {
            firstname,
            lastname,
            address,
            phonenumber,
            email,
            password
        });
        return res.status(200).json({
            success: true,
            message: 'Profil mis à jour avec succès',
            data: {
                user: {
                    id: updatedUser.id,
                    firstname: updatedUser.firstname,
                    lastname: updatedUser.lastname,
                    email: updatedUser.email,
                    address: updatedUser.address || '',
                    phonenumber: updatedUser.phonenumber || '',
                    password: updatedUser.password || ''
                }
            }
        });
    } catch (error) {
        console.error('Erreur mise à jour profil :', error);
        res.status(500).json({
            success: false,
            message: error.message || "Erreur lors de la mise à jour du profil"
        });
    }
})
module.exports = router
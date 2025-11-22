const express = require('express')
const router = express.Router()
const User = require('../models/User')

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

        res.status(201).json({
            success: true,
            message: 'Compte crée avec succès',
            data: {
                user : {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                }
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
                }
            }
        })

        // if(user){
        //     const isPasswordValid = User.comparePassword(password, user.password)
        //     if(isPasswordValid){
        //         res.json({
        //             success: true,
        //             message: "Connexion réussie",
        //             data:{
        //                 id: user.id,
        //                 firstname: user.firstname,
        //                 lastname: user.lastname,
        //                 emai: user.email,
        //                 address: user.address,
        //                 phonenumber: user.phonenumber
        //             }

        //         })
        //     }else{
        //         res.status(400).json({
        //             success: false,
        //             message: "Mot de passe incorrect"
        //         })
        //     }

        // }else{
        //         return res.status(400).json({
        //             success: false,
        //             message: "Email ou mot de passe incorrect"
        //         })
        //     }
    }catch(error){
        console.error('Erreur inscription : ', error);
        
        res.status(500).json({
            success: false,
            message: error.message || "Erreur lors de la connexion"
        })
    }
})
module.exports = router
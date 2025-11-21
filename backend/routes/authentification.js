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
        const checkMail = User.checkEmailExist(email)

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

module.exports = router
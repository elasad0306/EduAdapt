const express = require('express')
const cors = require('cors')
const {connection} = require('./database/db')
const User = require('./models/User')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Inscription utilisateurs
app.post('/api/register', async (req, res) =>{
    try {
        console.log("Donnée reçu", req.body) 

        const {firstname, lastname, email, password} = req.body

        const user = await User.createUser({
            firstname,
            lastname,
            email,
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


app.get('/api/users', (req,res) =>{
    req = "SELECT * FROM user"
    connection.query(req,(err, data) =>{
        if(err) return res.json(err);
        return res.json(data)
    })
})
app.listen(8000, ()=>{
    console.log("Listening");
    
})

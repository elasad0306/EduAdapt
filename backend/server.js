const express = require('express')
const cors = require('cors')
const {connection} = require('./database/db')
const User = require('./models/User')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Inscription utilisateurs
app.post('/api/register', require('./routes/authentification'))

//Connexion de l'utilisateur
app.post('/api/login', require('./routes/authentification'))

app.get('/api/profile', require('./routes/authentification'))
app.put('/api/Modifprofile', require('./routes/authentification'))
app.listen(8000, ()=>{
    console.log("Listening");
    
})

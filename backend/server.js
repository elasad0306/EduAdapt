const express = require('express')
const cors = require('cors')
const {connection} = require('./database/db')
const User = require('./models/User')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Inscription utilisateurs

//Connexion de l'utilisateur





app.get('/api/profile', require('./routes/authentification'))
// Mount authentication routes router (router defines the /api/* paths)
app.use(require('./routes/authentification'))

// Health check endpoint to verify server returns JSON
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Backend healthy' })
})
app.listen(8000, ()=>{
    console.log("Listening");
    
})

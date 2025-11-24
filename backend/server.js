const express = require('express')
const cors = require('cors')
const {connection} = require('./database/db')
const User = require('./models/User')
const app = express()
const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({apiKey: "AIzaSyCItx7r4atsT5jIxQ4uw6IiejX-StRXF6w"})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Inscription utilisateurs
app.post('/api/register', require('./routes/authentification'))

//Connexion de l'utilisateur
app.post('/api/login', require('./routes/authentification'))





app.get('/api/users', (req,res) =>{
    req = "SELECT * FROM user"
    connection.query(req,(err, data) =>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get('/api/ia', async (req, res) =>{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "How does AI work ?"
    })
    console.log(response.text);
})

app.listen(8000, ()=>{
    console.log("Listening");
    
})

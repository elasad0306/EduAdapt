const express = require('express')
const cors = require('cors')
const {connection} = require('./database/db')
const User = require('./models/User')
const app = express()
const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({apiKey: "AIzaSyB8-5wjBbteKeyvW8U9wGD-YsP35FU1aAw"})
const promptInstruction = `As an educational assistant, generate structured content on the following theme: “[THEME]”.

Specific instructions:

Analyze the provided theme and automatically determine an appropriate difficulty level (easy, mid, or hard)

Create a clear and concise educational summary of 150–200 words

Generate 5 varied quiz questions (multiple choice) adapted to the difficulty level

The questions must cover different aspects of the theme

EXCLUSIVE response format:
You must respond ONLY with a valid JSON object, with no text before or after, no backticks, and no “json” marker.

{
theme: "[the exact provided theme]",
"difficulty": "[facile/intermédiaire/difficile]",
"resume": "[detailed summary here]",
"questions": [
{
"question": "[text of question 1]",
"type": "[mcq/true_false/open]",
"options": ["option1", "option2", "option3", "option4"] (only for qcm),
"reponse": "[correct answer]"
}
// ... up to 5 questions
]
}

Important guidelines:
Respond in French

Respond ONLY with the raw JSON object, without markdown formatting

Do NOT add ANY text before or after the JSON

Do NOT use backticks or code markers

Make sure the JSON is well-formed and valid

Adapt the complexity of the summary and questions to the difficulty level

For open-ended questions, provide a concise but complete answer`;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Inscription utilisateurs
app.post('/api/register', require('./routes/authentification'))

//Connexion de l'utilisateur
app.post('/api/login', require('./routes/authentification'))

app.get('/api/profile', require('./routes/authentification'))
app.put('/api/Modifprofile', require('./routes/authentification'))


app.post('/api/ia', async (req, res) =>{
    // console.log(req.body.input);
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: req.body.input,
        config: {
            systemInstruction: promptInstruction
        },
    })
    const deletejson = response.text
    
    const jsonFormat = (textFormat) =>{
        return  alternativeNettoyee = textFormat
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/^"|"$/g, '');
    }
    
    const newFormat = JSON.parse(jsonFormat(deletejson))
    // console.log("Thème : ", newFormat.theme);

    const result = {
        theme : newFormat.theme,
        difficulty : newFormat.difficulty,
        resume : newFormat.resume,
        questions : newFormat.questions.map((question, index) =>({
            question : question.question,
            type : question.type,
            options : question.options,
            response : question.response
            
        }))

    }
    console.log(result)
    // const formatJSON = JSON.stringify(newFormat)   
    res.status(200).json({
        success: true,
        message: "Succès",
        result
    })
    
})

app.listen(8000, ()=>{
    console.log("Listening");
    
})

const mysql = require('mysql2')

//Connexion à la base de données 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eduadapt'
})

const connectDb = connection.connect()
//Vérifier si on est bien connecter
if(!connectDb){
    console.log("Connexion réussi");
}else{
    console.error("Erreur", error);
}

module.exports = {
    connection: connection.promise()
}
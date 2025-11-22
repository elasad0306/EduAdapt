const { connection } = require('../database/db')
const bcrypt = require('bcryptjs')
class User {
    static async createUser(userData){
        const {firstname, lastname, email, address, phonenumber, password} = userData

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)


        const [result] = await connection.execute(
            'INSERT INTO user (firstname, lastname, email, address, phonenumber, password) VALUES (?, ?, ?, ?, ?, ?)',
            [firstname, lastname, email, address, phonenumber, hashedPassword]
        )
        return{
            id: result.insertId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            address: address,
            phonenumber: phonenumber
        }
    }
    //Pour rechercher un utilisateur à l'aide de son email
    static async findEmail(emailUser){
        const [email] = await connection.execute(
            'SELECT * FROM user WHERE email = ?', [emailUser]
        )
        return email[0] || null 
    }
    //Afin de vérifier si l'email entré par l'utilisateur n'existe pas déjà dans la base données, 
    // si emails.length = 1 alors l'email existe déjà  dans la base de donnée
    static async checkEmailExist(email){
        const [emails] = await connection.execute(
            'SELECT id FROM user WHERE email = ?',[email]
        )
        return emails.length > 0 
    } 

    //Ppour comprarer le mot de passe entrer par l'utilisateur avec celle stocker dans la bdd 
    static async comparePassword(passwordEnter, hashedPassword){
        return await bcrypt.compare(passwordEnter, hashedPassword)

    }

}

module.exports = User
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

    static async checkEmailExist(email){
        const [emails] = await connection.execute(
            'SELECT id FROM user WHERE email = ?',[email]
        )
        return emails.length > 0 
    } 

}

module.exports = User
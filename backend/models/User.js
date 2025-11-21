const { connection } = require('../database/db')
const bcrypt = require('bcryptjs')
class User {
    static async createUser(userData){
        const {firstname, lastname, email, password} = userData

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const [result] = await connection.execute(
            'INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',[firstname, lastname, email, hashedPassword]
        )
        return{
            id: result.insertId,
            firstname: firstname,
            lastname: lastname,
            email:email
        }
    }
}

module.exports = User
const { connection } = require('../database/db')
const bcrypt = require('bcryptjs')
class User {
    static async createUser(userData){
        const {firstname, lastname, email, address, phonenumber, password} = userData

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)


        const [result] = await connection.execute(
            'INSERT INTO users (firstname, lastname, email, address, phonenumber, password) VALUES (?, ?, ?, ?, ?, ?)',
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

    static async findByID(id){
        const [ids] = await connection.execute(
            'SELECT id, firstname, lastname, email, address, phonenumber, password FROM users WHERE id = ?', [id]
        )
        return ids[0] || null
    }
    //Pour rechercher un utilisateur à l'aide de son email
    static async findEmail(emailUser){
        const [email] = await connection.execute(
            'SELECT * FROM users WHERE email = ?', [emailUser]
        )
        return email[0] || null 
    }
    //Afin de vérifier si l'email entré par l'utilisateur n'existe pas déjà dans la base données, 
    // si emails.length = 1 alors l'email existe déjà  dans la base de donnée
    static async checkEmailExist(email){
        const [emails] = await connection.execute(
            'SELECT id FROM users WHERE email = ?',[email]
        )
        return emails.length > 0 
    } 

    //Pour comparer le mot de passe entré par l'utilisateur avec celui stocké dans la bdd 
    static async comparePassword(passwordEnter, hashedPassword){
        return await bcrypt.compare(passwordEnter, hashedPassword)
    }

    static async updateUser(id, data){
        const fields = []
        const values = []

        if(data.firstname !== undefined){ fields.push('firstname = ?'); values.push(data.firstname) }
        if(data.lastname !== undefined){ fields.push('lastname = ?'); values.push(data.lastname) }
        if(data.address !== undefined){ fields.push('address = ?'); values.push(data.address) }
        if(data.phonenumber !== undefined){ fields.push('phonenumber = ?'); values.push(data.phonenumber) }
        if(data.password !== undefined){ 
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(data.password, salt)
            fields.push('password = ?'); 
            values.push(hashedPassword) 
        }
        if(fields.length === 0) return null

        values.push(id)

        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`
        const [result] = await connection.execute(sql, values)
        return result
    }

    
}

module.exports = User
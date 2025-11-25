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

    //Ppour comprarer le mot de passe entrer par l'utilisateur avec celle stocker dans la bdd 
    static async comparePassword(passwordEnter, hashedPassword){
        return await bcrypt.compare(passwordEnter, hashedPassword)
    }

    //Pour mettre à jour le profil utilisateur
    static async updateUser(id, userData){
        const {firstname, lastname, email, address, phonenumber, password} = userData

        let updateFields = []
        let updateValues = []

        if(firstname !== undefined){
            updateFields.push('firstname = ?')
            updateValues.push(firstname)
        }
        if(lastname !== undefined){
            updateFields.push('lastname = ?')
            updateValues.push(lastname)
        }
        if(email !== undefined){
            updateFields.push('email = ?')
            updateValues.push(email)
        }
        if(address !== undefined){
            updateFields.push('address = ?')
            updateValues.push(address)
        }
        if(phonenumber !== undefined){
            updateFields.push('phonenumber = ?')
            updateValues.push(phonenumber)
        }
        if(password !== undefined && password !== null){
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt)
            updateFields.push('password = ?')
            updateValues.push(hashedPassword)
        }

        if(updateFields.length === 0){
            return await User.findByID(id)
        }

        updateValues.push(id)

        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`

        await connection.execute(query, updateValues)

        return await User.findByID(id)
    }

    
}

module.exports = User
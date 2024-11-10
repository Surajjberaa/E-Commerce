import bcrypt from 'bcryptjs'
import User from "../../models/User.js"
// registerUser
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.json({
            success: true,
            message: "User created"
        }).status(200)

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Some error occured"
        }).status(500)

    }
}

// login

// logout

// auth-middleware


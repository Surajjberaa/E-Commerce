import bcrypt from 'bcryptjs'
import User from "../../models/User.js"
import jwt from 'jsonwebtoken'



// registerUser
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists! Try again with different email."
            }).status(400)
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.json({
            success: true,
            message: "Registration successful"
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
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const checkUser = await User.findOne({ email })
        // console.log(checkUser);

        if (!checkUser) {
            return res.json({
                message: "User Doesn't exist",
                success: false
            }).status(400)
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password)
        // console.log(checkPassword);

        if (!checkPassword) {
            return res.json({
                message: "Password is incorrect! Try again.",
                success: false
            }).status(400)
        }

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            username: checkUser.username
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: "Logged In Successfuly",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                username: checkUser.username
            }
        })



    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Some error occured"
        }).status(500)

    }
}


// logout
export const logoutUser = async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully"
    })
}


// auth-middleware
export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({
            success: false,
            message: "Unauthorised user!"
        }).status(401)
    }

    try {

        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded
        next()

    } catch (error) {
        res.json({
            success: false,
            message: "Unauthorised user!",
            error: error
        }).status(401)
    }
}


const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1 days" })
}
// route for user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "user doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json({ message: "Invalid Credentials" })
        }

        const payload = {
            userId: user._id,
            email: user.email
        }
        const token = createToken(payload)
        res.status(200).json({ message: token });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// route for user registration
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking unique email 
        const exists = await User.findOne({ email })

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        // token for users to login (automatic logins)
        const payload = {
            userId: user._id,
            email: user.email
        }

        const token = createToken(payload)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const payload = ({
                role: "ADMIN",
                email: email,
                password: password
            })
            const token = createToken(payload);
            return res.status(200).json({token: token, user: payload})
        } else {
            res.status(401).json({message: "Invalid credentials"});
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

// get session
const session = async(req, res) => {
    const session = req.session;
    return res.json({user: session});
}

module.exports = {
    loginUser,
    registerUser,
    adminLogin,
    session
}
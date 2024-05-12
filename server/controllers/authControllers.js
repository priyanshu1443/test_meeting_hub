import { Registration } from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, password, confirmPassword } = req.body
    console.log(email, password, confirmPassword)
    if (email && password && confirmPassword && password === confirmPassword) {
        try {
            const user = await Registration.findOne({ email })
            if (user) {
                res.status(200).send({ "Message": "Email id is already registered" })
            } else {
                const hashPassword = await bcrypt.hash(password, 12)
                const newUser = await Registration.create({ email, password: hashPassword })
                res.status(201).send({ message: "Registered Successfully" })
            }
        } catch (error) {
            console.log(error)
            res.status(200).send({ message: 'fill  all the field correctly' })
        }
    } else {
        console.log("hii")
        res.status(200).send()
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    if (!email && !password) {
        res.send(200).send({ Message: "Please provide an Email and Password" })
    }
    try {
        const user = await Registration.findOne({ email })
        if (!user) {
            res.status(200).send({ Message: "Email and password is incorrect" })
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (matchPassword) {
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
            res.cookie("jwtToken", token, { httpOnly: true })
            delete user.password
            res.header("Access-Control-Allow-Origin", process.env.CLINT_PORT)
            res.status(201).send({ message: "Login Successfully", user })
        } else {
            res.status(200).send({ message: "UserName and passsword is incorrrect" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const googleLogin = async (req, res) => {
    const { email, name, picture, } = req.body
    console.log(email, name, picture)
    if (email, name, picture) {
        try {
            const user = await Registration.findOne({ email })
            if (user) {
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
                res.cookie('jwtToken', token, { httpOnly: true })
                res.status(201).send({ message: "Login Successfully", user })
            } else {
                const newUser = await Registration.create({ email, password: null, name, image: { url: picture } })
                const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
                res.cookie('jwtToken', token, { httpOnly: true })
                res.status(201).send({ message: "Login Successfully", user })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}

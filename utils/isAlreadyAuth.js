require('dotenv').config()
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model'

const isAlreadyAuth = async (req, res, next) => {
    try {
        if(!req.header.Authorization){
            return next()
        }
        let token = req.header.Authorization.replace('Bearer', "").trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await userModel.findById( { _id : decoded._id} )
        if(!user){
            return next()
        }
        res.status(200).redirect('/dashboard')
    } catch (error) {
        console.log(error);
        return res.status(401).redirect('/')
    }
}

module.exports = isAlreadyAuth
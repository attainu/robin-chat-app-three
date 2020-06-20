require('dotenv').config()
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model'

const auth = async (req, res, next) => {
    try {
        let token = req.header.Authorization.replace('Bearer', "").trim()
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await userModel.findById( { _id : decoded._id} )
        if(!user){
            return res.status(401).send('please Authenticate')
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        return res.status(401).redirect('/')
    }
}

module.exports = auth

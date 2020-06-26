require('dotenv').config()
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({

    Username : {
        type : String,
        trim : true,
        required : true
    },
    Email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true
    },
    Password : {
        type : String,
        required : true,
        trim : true
    },
    Workspaces : [{
        workspace : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Workspace'
        }
    }]
})

userSchema.methods.genrateAuthToken = function (){
    const user = this
    const token = jwt.sign( {_id : user._id.toString()}, process.env.SECRET_KEY, { expiresIn : '6h'})
    return token
}

userSchema.statics.findByCredentials = async function (Email, Password){
    const user = await User.findOne( { Email } )
    if(!user){
        console.log('Wrong Email');
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(Password, user.Password)
    if(!isMatch){
        console.log('Wrong Password');
        throw new Error('Unable to login')
    } 
    return user    
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('Password')) {
        user.Password = await bcrypt.hash(user.Password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

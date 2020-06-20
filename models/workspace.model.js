import mongoose from 'mongoose'

const workspaceSchema = mongoose.Schema({

    Name : {
        type : String,
        required : true,
        trim : true
    },
    Discription : {
        type : String,
        required : true,
        trim : true
    },
    ValidEmails : [{
        type : String,
        unique : true,
        trim : true,
        lowercase : true
    }],
    Teammates : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    Admin : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],

})

const Workspace = mongoose.model('Workspace', workspaceSchema)

module.exports = Workspace
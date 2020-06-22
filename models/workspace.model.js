import mongoose from 'mongoose'

const workspaceSchema = mongoose.Schema({

    Name : {
        type : String,
        unique : true,
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
        trim : true,
        lowercase : true
    }],
    Teammates : [{
        Teammate :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    }],
    Admins : [{
        Admin : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    }],

})

const Workspace = mongoose.model('Workspace', workspaceSchema)

module.exports = Workspace
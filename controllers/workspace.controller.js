import workspaceModel from '../models/workspace.model'
import userModel from '../models/user.model'
import { check } from '../utils/validEmailCheck'
import { sendInvitation } from '../utils/invitationMail'

class Workspace {

    getForm(req, res, next) {
        res.status(200).sendFile('workspace.html', { root : '\public'})
    }

    async create(req, res, next) {
        req.body.ValidEmails = check(req.body.ValidEmails, req.user)
        sendInvitation(req.body.Name,req.body.ValidEmails)
        req.body.Admins = [{ Admin : req.user._id}]
        const workspace = new workspaceModel(req.body)
        try {
            await workspace.save()
            let user = req.user
            user.Workspaces = user.Workspaces.concat( { workspace : workspace._id})
            await user.save()
            user = await userModel.findOne({ _id : req.user._id}).populate('Workspaces.workspace')
            res.status(201).render('dashboard',
            { Err : null, User: req.user.Username ,Workspaces : user.Workspaces })
        } catch (error) {
            if(error.name === 'MongoError' && error.code === 11000){
                return res.status(500).send('Workspace already registered')
            }
            res.status(500).send(error)
        }
    }

    async findAndJoinWorkspace(req, res, next){
        try {
            const workspace = await workspaceModel.findOne( { Name : req.body.Name })
            let user = req.user
            
            // For invalid workspace 
            if(!workspace || !workspace.ValidEmails.includes(user.Email)){
                user = await userModel.findOne({ _id : req.user._id}).populate('Workspaces.workspace')
                return res.status(404).render('dashboard', 
                { Err : `Didn't find workspace !, please check your workspace name `,
                User: req.user.Username ,Workspaces : user.Workspaces })
            }

            // For Already Registered
            user = await userModel.findOne({ _id : req.user._id}).populate('Workspaces.workspace')
            if(user.Workspaces.some( Obj => { return Obj.workspace.Name === req.body.Name})){
                return res.status(201).render('dashboard',
                    { Err : `You are already registered to this workspace`, 
                    User: req.user.Username ,Workspaces : user.Workspaces })
            }

            // For joining workspace
            user.Workspaces = user.Workspaces.concat({ workspace : workspace._id })
            await user.save()
            workspace.Teammates = workspace.Teammates.concat({ Teammate : user._id })
            await workspace.save()
            user = await userModel.findOne({ _id : req.user._id}).populate('Workspaces.workspace')
            res.status(201).render('dashboard',
            { Err : null, User: req.user.Username ,Workspaces : user.Workspaces })
        
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new Workspace
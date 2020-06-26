import workspaceModel from '../models/workspace.model'

class Websocket{

    async launch(req, res, next) {
        try {
            const workspace = await workspaceModel.findOne({ Name : req.params.workspace})
            if(!workspace){
                console.log('Workspace Not found');
                return;
            }
            const Username = req.user.Username
            const messageContainer = workspace.ChatHistory
            const workspaceName = workspace.Name
            res.status(200).render('chat_page', { Username, messageContainer, workspaceName})
        } catch (error) {
            res,status(500).send(error)
        }
    }

    leave(req, res, next){
        res.status(200).redirect('/dashboard')
    }
}

module.exports = new Websocket
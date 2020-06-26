import workspaceModel from '../models/workspace.model'

export async function storeMsg(msgBlock, Name) {
    try {
        const workspace = await workspaceModel.findOne({ Name })
        if(!workspace){
            console.log('workspace not found');
            return;
        }
        workspace.ChatHistory = workspace.ChatHistory.concat(msgBlock)
        await workspace.save()
    } catch (error) {
        console.log(error);
    }
}
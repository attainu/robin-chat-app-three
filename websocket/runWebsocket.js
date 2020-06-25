import webscoket from 'socket.io'
import { storeMsg } from './msgDatabase'
import { msgFormat } from './msgFormat'
import { userJoin, userLeave, getCurrentUser } from './socketUser'

const runWebsocket = (server) => {
    const io = webscoket(server)
    io.on('connection', socket => {
        console.log('new socket connection');

        socket.on('joinRoom', ({ Username, workspace} )=> {
            const user = userJoin(socket.id, Username, workspace)
            socket.join(user.workspace)

            socket.broadcast.to(user.workspace).emit('status', `${user.Username} has join the chat`)
            socket.on('disconnect', () => {
                socket.broadcast.to(user.workspace).emit('status', `${user.Username} has left the chat`)
                userLeave(socket.id)
            })
        })
        
        socket.on('chatMessage', ({ msg, workspace}) => {
            const user = getCurrentUser(socket.id);
            const msgBlock = msgFormat(`${user.Username}`,msg);
            storeMsg(msgBlock, workspace)
            io.emit('message', msgBlock);
        })

    })
}

module.exports = runWebsocket
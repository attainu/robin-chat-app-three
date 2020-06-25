let users = []

export function userJoin(socketId, Username, workspace) {
    const user = { socketId, Username, workspace };
    users.push(user);
    return user;
}

export function userLeave(socketId) {
    users = users.filter( user => user.socketId !== socketId)
}

export function getCurrentUser(socketId) {
    return users.find(user => user.socketId === socketId)
}
const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')
var Username = document.getElementById('username').textContent;
var workspace = document.getElementById('workspace').textContent;
chatMessage.scrollTop = chatMessage.scrollHeight;

const socket = io();

socket.emit('joinRoom', { Username , workspace})

socket.on('message', msg => {
    outputMessage(msg);
    chatMessage.scrollTop = chatMessage.scrollHeight;
})

socket.on('status', msg => {
    statusMessage(msg);
    chatMessage.scrollTop = chatMessage.scrollHeight;
})

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = event.target.elements.msg.value;
    socket.emit('chatMessage', { msg, workspace })
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

function outputMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.Username} <span class="time">${msg.Time}</span></p>
            <p class="text">
                ${msg.Text}
            </p>`;
    document.querySelector('.chat-messages').appendChild(div)
}

function statusMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<h5 class="text" style="color:rgb(80, 9, 80)"> ${msg} </h5>`
    document.querySelector('.chat-messages').appendChild(div)
}
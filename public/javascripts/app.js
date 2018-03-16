document.addEventListener("DOMContentLoaded", () => {
  listenForMsg();
});

const socket = io();

function listenForMsg(){
  const submit = document.getElementsByTagName('button')[0];
  submit.addEventListener('click', e => {
    e.preventDefault();
    const chatMsg = document.getElementById('message').value;
    sendMsg(chatMsg);
  });
}

function sendMsg(chatMsg){
  socket.emit('message', chatMsg);
  document.getElementById('message').value = '';
}

socket.on('message', chatMsg => {
  const msgList = document.getElementById('messages');
  const newMsg = document.createElement('div')
  newMsg.innerText = chatMsg;
  msgList.appendChild(newMsg);
});

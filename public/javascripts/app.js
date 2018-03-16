document.addEventListener('DOMContentLoaded', () => {
  listenForMsg();
});

const socket = io();

function listenForMsg(){
  const submit = document.getElementsByTagName('button')[0];

  submit.addEventListener('click', e => {
    e.preventDefault();
    const chatMsg = document.getElementById('message').value;
    const name = document.getElementById('name'); 
    if (name) saveName();
    sendMsg(chatMsg);
  });
}

function sendMsg(chatMsg) {
  socket.emit('message', chatMsg);
  document.getElementById('message').value = '';
}

function saveName() {
  const name = document.getElementById('name').value;
  socket.emit('name', name);
  const elem = document.getElementById('name-group');
  if (elem) removeNameField(elem);
}

function removeNameField(nameElem) {
  const elem = nameElem
  elem.remove(); 
}

socket.on('name', name => {
  const msgList = document.getElementById('messages');
  const newMsg = document.createElement('div');
  newMsg.className = 'name';
  newMsg.innerText = name;
  msgList.appendChild(newMsg);
});

socket.on('message', chatMsg => {
  const msgList = document.getElementById('messages');
  const newMsg = document.createElement('div');
  newMsg.innerText = chatMsg;
  msgList.appendChild(newMsg);
});

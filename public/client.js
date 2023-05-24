const socket = io();
let NAME;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".massage__area");
do {
  NAME = prompt("please enter your name:");
} while (!NAME);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMassage(e.target.value);
  }
});

function sendMassage(message) {
  let msg = {
    user: NAME,
    Message: message.trim(),
  };

  //append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "Message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.Message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//recived message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

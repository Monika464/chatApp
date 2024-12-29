const socket = io("http://localhost:3000")

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault()
  // console.log("przycisk on");
  //const message = document.querySelector("input").value;
  const message = e.target.elements.message.value
  //console.log("message consolelog", message);

  socket.emit("sendMessage", message)
})

const socket = io();

socket.on("countUpdate", (count) => {
  console.log("The count has been updated!", count);
});

document.querySelector("#increment").addEventListener("click", () => {
  console.log("Clicked");
  socket.emit("increment");
});

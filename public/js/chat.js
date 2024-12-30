const socket = io()

const form = document.getElementById("form")
const input = document.getElementById("input")
const messages = document.getElementById("messages")

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser")
  }

  navigator.geolocation.getCurrentPosition((position) => {
    //console.log(position)
    socket.emit("coords", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  })
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (input.value) {
    console.log("input-value", input.value)
    socket.emit("chat message", input.value)
    input.value = ""
  }
})

socket.on("chat message", (msg) => {
  const item = document.createElement("li")
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})

socket.on("hello", (arg) => {
  console.log(arg) // 'world'
})

socket.on("ktos", (arg2) => {
  console.log(arg2)
})

socket.on("ktosOff", (arg3) => {
  console.log(arg3)
})

// socket.on("coords", (position) => {
//   console.log("cord", position)
// })

socket.emit("hello", "jozek")

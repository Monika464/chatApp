const socket = io()

const form = document.getElementById("form")
const input = document.getElementById("input")
const messages = document.getElementById("messages")
const formButton = document.getElementById("form-button")
const locationButton = document.getElementById("send-location")

//document.querySelector("#send-location").addEventListener("click", () => {
locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser")
  }
  locationButton.setAttribute("disabled", "disabled")
  navigator.geolocation.getCurrentPosition((position) => {
    //console.log(position)
    socket.emit(
      "coords",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (coords) => {
        locationButton.removeAttribute("disabled")
        console.log(coords)
      },
    )
  })
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  formButton.setAttribute("disabled", "disabled")

  if (!input.value.trim()) {
    return formButton.removeAttribute("disabled")
  }

  if (input.value) {
    formButton.removeAttribute("disabled")
    //console.log("input-value", input.value)
    // socket.emit("chat message", input.value)
    socket.emit("chat message", input.value, (msg, error) => {
      if (error) {
        return console.log(error)
      }

      console.log(msg)
      input.focus()
    })

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

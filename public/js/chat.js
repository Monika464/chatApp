const socket = io()

const form = document.getElementById("form")
const input = document.getElementById("input")
const messages = document.getElementById("messages")
const formButton = document.getElementById("form-button")
const locationButton = document.getElementById("send-location")
const locationLink = document.getElementById("location-link")
const messages2 = document.querySelector("#messages2")
const geocoords = document.querySelector("#geocoords")

//templates

const messageTemplate = document.querySelector("#message-template").innerHTML
const coordinatesTemplate = document.querySelector(
  "#coordinates-template",
).innerHTML

//option
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})
console.log("userrname i room", username, room)
//console.log("qs", Qs)

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

// socket.emit("join", { username, room })
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = "/"
  } else {
    console.log("Joined successfully!")
  }
})

socket.on("chat message", (msg) => {
  //console.log("msg", msg)
  const html = Mustache.render(messageTemplate, {
    msg: msg.text,
    createdAt: moment(msg.createdAt).format("h:mm:ss a"),
  })
  messages2.insertAdjacentHTML("beforeend", html)
})

socket.on("coords message", (pos) => {
  //console.log("Odebrano zdarzenie coords", pos)
  const html = Mustache.render(coordinatesTemplate, {
    username: pos.username,
    url: pos.url,
    createdAt: moment(pos.createdAt).format("h:mm:ss a"),
  })
  geocoords.insertAdjacentHTML("beforeend", html)
})

// socket.on("coords message", (position) => {
//   console.log("cord", position)
// })

// socket.on("hello", (arg) => {
//   console.log(arg) // 'world'
// })

// socket.on("ktos", (arg2) => {
//   console.log(arg2)
// })

// socket.on("ktosOff", (arg3) => {
//   console.log(arg3)
// })

// socket.emit("hello", "jozek")

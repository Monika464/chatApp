const express = require("express")
const { createServer } = require("node:http")
const { join } = require("node:path")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/index.html"))
})

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("hello", (arg) => {
    // console.log(arg) // 'world'
  })

  socket.on("coords", (position) => {
    //console.log(position)
    io.emit(
      "chat message",
      `https://google.com/maps?q=${position.latitude}, ${position.longitude}`,
    )
  })

  socket.broadcast.emit("chat message", "ktos dołaczył")

  socket.on("disconnect", () => {
    console.log("user disconnected")
    socket.broadcast.emit("chat message", "ktos sie rozłączył")
  })

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg)
  })
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})
////////////
// const path = require("path")
// const http = require("http")
// const express = require("express")
// const socketio = require("socket.io")

// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

// const port = process.env.PORT || 3000
// const publicDirectoryPath = path.join(__dirname, "../public")

// app.use(express.static(publicDirectoryPath))

// io.on("connection", (socket) => {
//   socket.emit("messageConts", "Welcomme !")
//   socket.broadcast.emit("messageConst", "A new user has joined")

//   socket.on("sendMessage", (message) => {
//     //console.log("socket otrzymal mesage", message);
//     io.emit("message", message)
//   })

//   socket.on("disconnect", () => {
//     io.emit("message", "A user has left")
//   })
// })

// server.listen(port, () => {
//   console.log(`Server is up on port ${port}!`)
// })
//////////////

const express = require("express")
const { createServer } = require("node:http")
const { join } = require("node:path")
const { Server } = require("socket.io")
const { generateMessage } = require("./utils/messages")
const { generateLocation } = require("./utils/location")
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users")

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/index.html"))
})

io.on("connection", (socket) => {
  //console.log("a user connected")

  // socket.on("hello", (arg) => {
  //   // console.log(arg) // 'world'
  // })

  socket.on("coords", (position, callback) => {
    // console.log(position)
    const user = getUser(socket.id)

    const url = `https://google.com/maps?q=${position.latitude}, ${position.longitude}`
    io.emit(
      // "chat message",
      "coords message",
      // `https://google.com/maps?q=${position.latitude}, ${position.longitude}`,
      generateLocation(user.username, url),
    )
    callback("Delivered Geocode")
  })

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })
    //const { error, user } = addUser({ id: socket.id, username, room })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit("chat message", generateMessage("admin", "Welcome"))
    socket.broadcast
      .to(user.room)
      .emit(
        "chat message",
        generateMessage(`admin`, ` ${user.username} has joined`),
      )

    callback()
  })
  // socket.broadcast.emit("chat message", "ktos dołaczył")
  //socket.broadcast.emit("chat message", generateMessage("new user has joined"))

  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit(
        "chat message",
        generateMessage(`admin`, `${user.username} has left`),
      )
    }

    // console.log("user disconnected")
    //socket.broadcast.emit("chat message", generateMessage("ktos sie rozłączył"))
  })

  socket.on("chat message", async (msg, callback) => {
    const user = getUser(socket.id)
    // const { default: Filter } = await import("bad-words")
    // const filter = new Filter()

    // if (filter.isProfane(msg)) {
    //   return callback("Profanity is not allowed")
    // }
    //console.log("co tu", user)
    io.to(user.room).emit("chat message", generateMessage(user.username, msg))
    //io.emit("chat message", generateMessage(msg))
    callback("Delivered")
  })
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})

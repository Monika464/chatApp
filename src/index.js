const express = require("express")
const { createServer } = require("node:http")
const { join } = require("node:path")
const { Server } = require("socket.io")
const { generateMessage } = require("./utils/messages")

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

  socket.on("coords", (position, callback) => {
    // console.log(position)

    const url = `https://google.com/maps?q=${position.latitude}, ${position.longitude}`
    io.emit(
      // "chat message",
      "coords message",
      // `https://google.com/maps?q=${position.latitude}, ${position.longitude}`,
      url,
    )
    callback("Delivered Geocode")
  })

  // socket.broadcast.emit("chat message", "ktos dołaczył")
  socket.broadcast.emit("chat message", generateMessage("ktos dołaczył"))

  socket.on("disconnect", () => {
    console.log("user disconnected")
    socket.broadcast.emit("chat message", generateMessage("ktos sie rozłączył"))
  })

  socket.on("chat message", async (msg, callback) => {
    // const { default: Filter } = await import("bad-words")
    // const filter = new Filter()

    // if (filter.isProfane(msg)) {
    //   return callback("Profanity is not allowed")
    // }

    io.emit("chat message", generateMessage(msg))
    callback("Delivered")
  })
})

server.listen(3000, () => {
  console.log("server running at http://localhost:3000")
})

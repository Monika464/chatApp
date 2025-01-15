require("dotenv").config()
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

const Message = require("./models/message")
const CoordMessage = require("./models/coordmessage")

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
  //ZAPISYWANIE COORDS

  socket.on("coords", async (position, callback) => {
    // console.log(position)
    const user = getUser(socket.id)
    if (!user) return callback("User not found")

    const url = `https://google.com/maps?q=${position.latitude}, ${position.longitude}`
    const locationMessage = generateLocation(user.username, url)
    try {
      const coordMessage = new CoordMessage({
        username: user.username,
        url,
        room: user.room,
        createdAt: locationMessage.createdAt,
      })
      await coordMessage.save()
      // console.log("Coord message saved:", coordMessage)
      io.emit("coords message", generateLocation(user.username, url))
      callback("Delivered Geocode")
    } catch (error) {
      console.error("Error saving coord message:", error)
    }
  })

  socket.on("join", async (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })
    //const { error, user } = addUser({ id: socket.id, username, room })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    //POBIERANIE I WYSYLANIE WIADOMOSCI ZWYKŁYCH

    // Pobierz wiadomości z bazy danych dla tego pokoju
    const messages = await Message.find({ room: user.room }).sort({
      createdAt: 1,
    })

    try {
      socket.emit("load messages", messages)
    } catch (error) {
      console.error("Error loading messages:", error)
    }
    //POBIERANIE Z BAZY I  WYSYLANIE COORDS
    const coordMessages = await CoordMessage.find({ room: user.room })
    // console.log("cm", coordMessages)
    try {
      socket.emit("load cordmessages", coordMessages)
    } catch (error) {
      console.error("Error loading coord messages:", error)
    }

    //POZOSTAŁE

    socket.emit(
      "chat message",
      generateMessage("admin", `Welcome ${user.username}`),
    )
    socket.broadcast
      .to(user.room)
      .emit(
        "chat message",
        generateMessage(`admin`, ` ${user.username} has joined`),
      )
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })
  // socket.broadcast.emit("chat message", "ktos dołaczył")
  //socket.broadcast.emit("chat message", generateMessage("new user has joined"))
  //removeUser("iza")
  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit(
        "chat message",
        generateMessage(`admin`, `${user.username} has left`),
      )
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }

    // console.log("user disconnected")
    //socket.broadcast.emit("chat message", generateMessage("ktos sie rozłączył"))
  })

  socket.on("chat message", async (msg, callback) => {
    const user = getUser(socket.id)

    if (!user) {
      return callback("User not found")
    }

    const message = generateMessage(user.username, msg)

    try {
      await Message.create({
        username: message.username,
        text: message.text,
        room: user.room,
        createdAt: message.createdAt,
      })
      io.to(user.room).emit("chat message", generateMessage(user.username, msg))
      callback("Delivered")
    } catch (error) {
      console.error("Error saving message:", error)
      callback("Error saving message")
    }
  })
})

module.exports = { app, server }

const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

  room: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "coords"],
    default: "text", // Określa typ wiadomości
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message

// const mongoose = require("mongoose")

// const messageSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   text: {
//     type: String,
//     required: true,
//   },
//   room: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// })

// const Message = mongoose.model("Message", messageSchema)

// module.exports = Message

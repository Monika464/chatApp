const mongoose = require("mongoose")

const coordMessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const CoordMessage = mongoose.model("CoordMessage", coordMessageSchema)

module.exports = CoordMessage

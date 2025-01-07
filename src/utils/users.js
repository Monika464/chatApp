const users = []

//addUser, removeUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  //validate data
  if (!username || !room) {
    return {
      error: "Username and room are required",
    }
  }

  //Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username
  })

  //validate username
  if (existingUser) {
    return {
      error: "Username is in use",
    }
  }
  //Store user
  const user = { id, username, room }
  users.push(user)
  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => {
  return users.find((user) => user.id === id)
}

addUser({
  id: 22,
  username: "Helena",
  room: "buu",
})
addUser({
  id: 33,
  username: "Iza",
  room: "buu",
})

addUser({
  id: 44,
  username: "Monika",
  room: "muu",
})

const on = getUser(22)

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase()
  return users.filter((user) => user.room === room)
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
}

# Chat App

## Overview

A real-time chat application built with Node.js, Express, Socket.IO, and MongoDB. The application allows users to join chat rooms, send messages, share their location, and supports message moderation for authorized users.

## Features

- Real-time messaging using Socket.IO.

- Location sharing.

- Message moderation for admin users.

- Persistent message storage in MongoDB.

## Prerequisities

- Node.js: >=16.0.0 (recommended LTS version)
- npm: >=7.0.0
- MongoDB (local or cloud instance)

## Installation

Clone the project

```bash
  git clone https://github.com/Monika464/chatApp
```

Go to the project directory

```bash
  cd chatApp
```

Install MongoDB (if not already installed)

```bash
  sudo apt update
  sudo apt install mongodb
```

Start MongoDB

```bash
sudo systemctl start mongodb
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_ACCESS`

## Preview

You can test a basic functions of the app at the following link:

- **Preview:** [Link to chat](https://chatapp-tlzr.onrender.com)

## Example credentials for testing:

```javascript

  Rooms for testing:

  room1 or room2

```

## Scripts

| Script      | Description                                     |
| ----------- | ----------------------------------------------- |
| npm run dev | Start the app in development mode using nodemon |
| npm start   | Start the app in production mode                |

## Technologies:

| Tech     | Use                                                                 |
| -------- | ------------------------------------------------------------------- |
| Node.js  | Backend runtime environment                                         |
| Express  | Web framework for Node.js                                           |
| MongoDB  | Database for storing app data                                       |
| Mongoose | MongoDB ODM for database interaction                                |
| Mustache | Template engine for rendering views.                                |
| qs       | Query string parser.                                                |
| dotenv   | Environment variable management                                     |
| nodemon  | Development utility to restart the server automatically on changes. |
| prettier | Code formatting tool                                                |

###### Chat App © 2025 by MK

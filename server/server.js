const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Message = require('./models/messageModel');
const colors = require('colors');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

// Form here Realtime Socket PART
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`.yellow.bold);
});

// app.get('/', (req, res) => {
//   res.send('API is Running');
// });
// app.listen(5000, console.log(`Server is Running on Port ${PORT}`.yellow.bold));

// dotenv.config();
// Connect to the MongoDB
// connectDB();
// Create express app

// const messages = [];

// Middleware
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client/build')));

// FetchMessages
// app.get('/api/messages', (req, res) => {
//   console.log('api/messages called!');
//   res.json(messages);
// });

// SendMessage
// app.post('/api/message', (req, res) => {
//   const message = req.body.data;
//   console.log('Adding Message::::', message);
//   messages.push(message);
//   res.json('message' + message + 'added');
// });

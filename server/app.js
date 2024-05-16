const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
}) 

let users = []

io.on('connection', (socket) => {
    console.log(`A user connected ${socket.id}`)
    socket.on('joinServer', (username) => {
        console.log(username)
        const user = {
            username,
            id: socket.id
        }
        users.push(user)
        socket.broadcast.emit('userOnline', user)
        io.emit('updatedUserList', users)
    })

    socket.on('joinRoom', (room, cb) => {
        socket.join(room)
        cb(messages[room])
        socket.emit('joined', messages[room])
        console.log(`joined room ${room}`)
    })

    socket.on('disconnect', () => {
        users = users.filter(u => u.id !== socket.id)
        io.emit('updateUserList', users)
    })
})

server.listen('8000', () => {
    console.log('Server started')
})
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

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('joinRoom', (room) => {
        socket.join(room)
        console.log(`joined room ${room}`)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

server.listen('8000', () => {
    console.log('Server started')
})
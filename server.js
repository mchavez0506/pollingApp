const express = require('express')
const app = express()
const PORT = 8082
const server = require('http').createServer(app)

const socketIO = require('socket.io')
const connections = []
const title = 'Untitled Presentation'


app.use(express.static('./public'))
app.use(express.static('./node_modules/bootstrap/dist'))

const io = socketIO(server)

server.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`)
})


io.sockets.on('connection', (socket) =>{


    socket.once('disconnect', () =>{
        connections.splice(connections.indexOf(socket), 1)
        socket.disconnect();
        console.log('disconnected: %s sockets remaining', connections.length)
    })

    socket.emit("welcome", {
        title:title
    })

    connections.push(socket)
    console.log("Connected: %s sockets connected", connections.length)
})

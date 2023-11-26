const app = require("express")()
const server = require("http").createServer(app)
const io = require('socket.io')(server,{cors:{origin: 'http://localhost:3000'}})

const PORT = 3001

io.on('connection',socket =>{
    console.log('Usuário conectado!', socket.id)

    socket.on('disconnect', reason =>{
        console.log("Usuario desconectado", socket.data.name)
    })

    socket.on('set_username', name =>{
        socket.data.name = name
        console.log(socket.data.name)
    })

    socket.on('message',text =>{
        io.emit('receive_message',{
            text,
            authorId:socket.id,
            user:socket.data.name
        })
    })
})

server.listen(PORT, ()=> console.log('Server running...'))
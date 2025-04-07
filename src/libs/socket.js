const { Server } = require("socket.io")


let io;

const socketConnection = (server) => {
    io = new Server(server)

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId
        socket.join(`room${userId}`)

        console.log("User connected")
        socket.on("disconnect", () => {
            console.log("User disconnected")
        })
    })
}

const getIo = () => {
    if(!io) {
        throw new Error("Socket.io not initialized")
    }
    return io
}

module.exports = { socketConnection, getIo }
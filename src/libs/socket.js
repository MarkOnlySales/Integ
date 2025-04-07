const { Server } = require("socket.io")


let io;
const userSocketMap = {};

const socketConnection = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId

        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected`);
            socket.broadcast.emit("userDisconnected", userId);
            delete userSocketMap[userId];
        });
        
        socket.on("groupchat", (message) => {
            console.log(`[Group] ${userId}: ${message}`);
            io.emit("groupchat", `${userId}: ${message}`)
        })

        socket.on("privatechat", ({ to, message }) => {
            console.log(`[Private] ${userId} to ${to}: ${message}`);

            const targetSocketId = userSocketMap[to];
            if (!targetSocketId) {
                console.log(`User ${to} is not connected`);
                io.to(userSocketMap[userId]).emit("privatechat", {
                    "error": "User not connected"
                })
                return;
            }

            io.to(targetSocketId).emit("privatechat", {
                from: userId,
                message: message
            });
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
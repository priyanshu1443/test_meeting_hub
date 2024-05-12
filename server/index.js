import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import { Connection } from "./db/connection.js"
import UserRoutes from "./routers/authentication.js"
import MeetingRouters from "./routers/meetingroutes.js"

import { Server } from "socket.io"


dotenv.config()
Connection()

const port = process.env.PORT
const ip = process.env.IP_ADDRESS

console.log(port, ip)


const app = express()
app.use(express.json())

app.use(cors({ origin: "*" }));
app.use(cors({ credentials: true, origin: process.env.CLINT_PORT }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLINT_PORT);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use("/api", UserRoutes)
app.use("/api", MeetingRouters)



var server = app.listen(port, ip, () => {
    console.log(`Server is running on port number ${ip}:${port}`)
})
// var server = app.listen(port, () => {
//     console.log(`Server is running on port number ${ip}:${port}`)
// })


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

// const userConnection = []

// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);
//     socket.emit("done", { message: "Hii from server" })

//     socket.on("disconnect", () => {
//         console.log(socket.id, " is disconnected")
//     })
// });

const userConnection = []

io.on("connection", (socket) => {
    console.log('Socket id : ' + socket.id)

    socket.on("user_connect", (data) => {
        console.log("user_connect", data.display_name, data.meetingid)
        var other_users = userConnection.filter((p) => p.meeting_id === data.meetingid)
        userConnection.push({
            connectionId: socket.id,
            user_id: data.display_name,
            meeting_id: data.meetingid
        })

        other_users.forEach((v) => {
            socket.to(v.connectionId).emit("inform_others_about_me", {
                other_user_id: data.display_name,
                connId: socket.id
            })
        })

        socket.emit("inform_me_about_other_user", other_users)
    })

    socket.on("SDPProcess", (data) => {
        socket.to(data.to_connid).emit("SDPProcess", {
            message: data.message,
            from_connid: socket.id
        })
    })
})


io.on("error", (err) => {
    console.error("Socket.IO Error:", err);
});





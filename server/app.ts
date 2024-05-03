import {Server, Socket} from 'socket.io';
import express from "express";
import {createServer} from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from 'express-session'
import {userRouter, userServices} from "./routes/UserRoutes";
import {serverServices} from "./routes/ServerRoutes";

const handlers = require('./controller/ws/SocketHandlers');

const app = express()
const httpServer = createServer(app)

const sessionMiddleware = session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
})

const io = new Server(httpServer,{
    maxHttpBufferSize: 3e8,
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
});

io.engine.use(sessionMiddleware);

io.use(async (socket, next) => {
    const cookies = socket.request.headers.cookie;

    if (cookies) {
        const cookieArray = cookies.split(';');
        for (const cookie of cookieArray) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'loggedInUser') {
                socket.data = await userServices.checkAuth(value)
                break;
            }
        }
    }

    next()
});

const onConnection = (socket: Socket) => {
    handlers(io, socket, userServices, serverServices);
}

io.on('connection', onConnection)

app.use(sessionMiddleware);
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', userRouter)

// Start the server
const PORT = 4000;
httpServer.listen(PORT);

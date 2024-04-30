import {Server, Socket} from 'socket.io';
import {Message} from "./domain/Message";
import {CustomServer} from "./domain/CustomServer";
import {User} from "./domain/User";
import {CustomChannel} from "./domain/CustomChannel";
import express from "express";
import {createServer} from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as bcrypt from "bcrypt"

const users: User[] = [];
let servers: CustomServer[] = [];

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer,{
    maxHttpBufferSize: 3e8,
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
});

app.use(bodyParser.json())
app.use(cookieParser())

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, email, hashedPassword);

        if (!users.some((u) => u.username == user.username)) {
            users.push(user);
            res.cookie('loggedInUser', user.username, { maxAge: 900000, httpOnly: true, secure: true });
            res.status(201).send({ message: 'Account created', user: user });
        } else {
            res.status(400).send({ message: 'Username already exists' });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = users.find((u) => u.username == username);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.cookie('loggedInUser', user.username, { maxAge: 900000, httpOnly: true, secure: true });

                res.status(200).send({ message: 'Login successful', user: user });
            } else {
                res.status(401).send({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('loggedInUser');
    res.status(200).send({ message: 'Logout successful' });
});

io.use((socket, next) => {
    const cookies = socket.request.headers.cookie;

    if (cookies) {
        const cookieArray = cookies.split(';');
        for (const cookie of cookieArray) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'loggedInUser') {
                socket.data = value;
                break;
            }
        }
    }

    next()
});


io.on("connect", (main: Socket) => {
    console.log(`Client connected to main`);

    main.on("createServer", (data: {serverName: string, serverDescription: string, serverIcon: string}) => {
        const {serverName, serverDescription, serverIcon} = data;
        const id = main.id

        const username = main.data

        const owner = users.find(e => e.username == username)!
        const server = new CustomServer(serverName, serverDescription, owner, serverIcon);

        servers.push(server)

        main.join(server.id.toString(10));
        io.to(id).emit("createServerSuccess", server);
    })

    main.on("joinServer", (data: {serverName: string }) => {
        const {serverName} = data
        const id = main.id
        const username = main.data

        const serverFound = servers.find(s => s.name == serverName && !s.users.some((u) => u.username == serverName));

        if(!serverFound){
            main.to(id).emit("joinServerError", "Error occurred while joining server");
            return;
        }

        const userJoined = users.find(e => e.username == username)!

        servers.forEach(s => {
            if(s.id == serverFound.id){
                s.users.push(userJoined)
            }
        })

        main.join(serverFound.id.toString(10));
        io.to(serverFound.id.toString(10)).emit("memberJoined", {user: userJoined, serverId: serverFound.id});
        io.to(id).emit("joinServerSuccess", serverFound);
    })

    main.on("createChannel", (data: {serverId: number, channelName: string, channelDescription: string}) => {
        const id = main.id

        const {serverId, channelName, channelDescription} = data;

        const serverFound = servers.find(s => s.id == serverId);

        if(!serverFound){
            main.to(id).emit("createChannelError", "Error occurred while creating channel.");
            return;
        }

        const newChannel = new CustomChannel(channelName, channelDescription)

        servers.forEach(s => {
            if(s.id == serverId){
                s.channels.push(newChannel)
                return;
            }
        })

        io.to(serverId.toString(10)).emit("createChannelSuccess", {serverId: serverId, channel: newChannel});
    })

    main.on("messageServer", (data: {serverId: number, channelId: number, message: string}) => {
        const id = main.id
        const {serverId, channelId, message} = data
        const username = main.data

        const serverFound = servers.find(s => s.id == serverId);

        if(!serverFound){
            main.to(id).emit("messageServerError", "Error occurred while messaging channel.");
            return;
        }

        const channelFound = serverFound.channels.find(s => s.id == channelId);

        if(!channelFound){
            main.to(id).emit("messageServerError", "Error occurred while messaging channel.");
            return;
        }

        const user = users.find(e => e.username == username)!
        const newMessage = new Message(user.username, message)

        servers.forEach(s => {
            if(s.id == serverId){
                s.channels.forEach(channel => {
                    if(channel.id == channelId){
                        channel.messages.push(newMessage)
                        return;
                    }
                })
                return;
            }
        })

        io.to(serverId.toString(10)).emit("messageServerSuccess", {serverId: serverId, channelId: channelId, message: newMessage});
    })

    main.on("leaveServer", (serverId: number) => {
        const id = main.id
        const serverFound = servers.find(s => s.id == serverId)

        if(!serverFound){
            main.to(id).emit("leaveServerError", serverFound);
            return;
        }

        main.leave(serverFound.id.toString(10));
        io.to(id).emit("leaveServerSuccess", "Left successfully");
    })

    main.on("disconnect", () => {
        console.log(`Client disconnected from main`);
    })

})

// Start the server
const PORT = 4000;
httpServer.listen(PORT);

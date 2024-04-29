import express from 'express';
import http from 'http';
import {Server, Socket} from 'socket.io';
import {Message} from "./domain/Message";
import {CustomServer} from "./domain/CustomServer";
import {User} from "./domain/User";
import {CustomChannel} from "./domain/CustomChannel";

const app = express();
const server = http.createServer(app);
const io = new Server({
    maxHttpBufferSize: 3e8,
    cors: {
        origin: "http://localhost:3000"
    }
});

const users: User[] = [];
let servers: CustomServer[] = [];

io.on("connect", (main: Socket) => {
    console.log(`Client connected to main`);


    main.on("login", (username: string) => {
        const id = main.id

        if(!userExists(username) || !socketExists(id)){
           users.push(new User(username, main.id))
        }

        const serversIn = servers.filter(e => {
            return (e.users.some(user => user.name == username) || e.owner.some(user => user.name == username));
        })

        serversIn.forEach(e => {
            main.join(e.id.toString(10))
        })

        const user = users.find(e => e.name == username)!

        io.to(id).emit("loginSuccess", {user: user, servers: serversIn});
    })

    main.on("createServer", (data: {serverName: string, serverDescription: string, serverIcon: string}) => {
        const {serverName, serverDescription, serverIcon} = data;
        const id = main.id

        if(!socketExists(id)){
            main.to(id).emit("createServerError", "Error occurred while creating server");
            return
        }

        const owner = users.find(e => e.socketId == id)!
        const server = new CustomServer(serverName, serverDescription, owner, serverIcon);

        servers.push(server)

        main.join(server.id.toString(10));
        io.to(id).emit("createServerSuccess", server);
    })

    main.on("joinServer", (data: { username: string, serverName: string }) => {
        const {username, serverName} = data
        const id = main.id

        const serverFound = servers.find(s => s.name == serverName)

        if(!serverFound){
            main.to(id).emit("joinServerError", "Error occurred while joining server");
            return;
        }

        const userJoined = users.find(e => e.name == username)!

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

        const user = users.find(e => e.socketId == id)!
        const newMessage = new Message(user.name, message)

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

    function userExists(username: string){
        return users.some(e => e.name === username)
    }

    function socketExists(id: string){
        return users.some(e => e.socketId === id);
    }

})

// Start the server
const PORT = 4000;
io.listen(PORT);

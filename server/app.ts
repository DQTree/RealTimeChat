import express, { Express } from "express";
import { createServer } from "http";
import { Socket, Server } from "socket.io";
import {CustomServer} from './domain/CustomServer'
import {CustomChannel} from './domain/CustomChannel'
import {Message} from './domain/Message'
import {User} from "./domain/User";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

const users: Map<string, User> = new Map();
const servers: CustomServer[] = [];

// Handle socket connections
io.on("connect", (socket: Socket) => {
    console.log("User connected")

    socket.on("login", (username: string) => {
        const id = socket.id

        if(!userExists(id)){
            users.set(id, new User(username, id));
        }

        io.to(id).emit("loginSuccess", "Logged in successfully! Users logged in: " + users);
    })

    socket.on("createServer", (data: {serverName: string, description: string}) => {
        const id = socket.id
        const {serverName, description} = data;

        if(!userExists(id)){
            io.to(id).emit("createServerError", "User not logged in")
            return;
        }

        if(serverExists(serverName)){
            io.to(id).emit("createServerError", "Server already exists")
            return;
        }

        servers.push(new CustomServer(serverName, description, users.get(id)!));

        io.to(id).emit("createServerSuccess", servers);
    });

    socket.on("createChannel", (data: {serverName: string, channelName: string, description: string}) => {
        const id = socket.id
        const {serverName, channelName, description} = data;

        if(!userExists(id)){
            io.to(id).emit("createChannelError", "User not logged in.")
            return;
        }

        const serverIndex = servers.findIndex(server => server.name === serverName);

        if (serverIndex === -1) {
            io.to(id).emit("createChannelError", "Server does not exist.");
            return;
        }

        servers[serverIndex].channels.push([new CustomChannel(channelName, description), []]);

        io.emit("createChannelSuccess", { serverName, channelName, description });
    });

    socket.on("joinServer", (data: {serverName:string}) => {
        const id = socket.id
        const {serverName} = data

        if(!userExists(id)){
            io.to(id).emit("joinServerError", "User not logged in.")
            return;
        }

        if(!serverExists(serverName)){
            io.to(id).emit("joinServerError", "Server does not exist.")
            return;
        }

        io.to(id).emit("joinServerSuccess")
    });

    socket.on("joinChannel", (data: {serverName: string, channelName: string}) => {
        const id = socket.id;
        const { serverName, channelName } = data;

        if (!userExists(id)) {
            io.to(id).emit("joinChannelError", "User not logged in.");
            return;
        }

        const serverIndex = servers.findIndex(server => server.name === serverName);

        if (serverIndex === -1) {
            io.to(id).emit("joinChannelError", "Server does not exist.");
            return;
        }

        const channelIndex = servers[serverIndex].channels.findIndex(channel => channel[0].name === channelName);

        if (channelIndex === -1) {
            io.to(id).emit("joinChannelError", "Server/channel doesn't exist.");
            return;
        }

        const messages = servers[serverIndex].channels[channelIndex][1];

        io.to(id).emit("joinChannelSuccess", { messages });
    })

    socket.on("message", (data: {serverName: string, channelName: string, message: string}) => {
        const id = socket.id
        const {serverName, channelName, message} = data

        if(!channelExists(serverName, channelName)){
            io.to(id).emit("joinChannelError", "Server/channel doesn't exist.")
        }

        io.to(channelName).emit("message", {username: users.get(id), message: message})
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    function userExists(socketId: string): boolean {
        for (const user of users.values()) {
            if (user.socketId === socketId) {
                return true;
            }
        }
        return false;
    }

    function serverExists(serverName: string): boolean {
        return servers.some(server => server.name === serverName);
    }

    function channelExists(serverName: string, channelName: string): boolean {
        const serverIndex = servers.findIndex(server => server.name === serverName);
        if (serverIndex !== -1) {
            return servers[serverIndex].channels.some(channel => channel[0].name === channelName);
        }
        return false;
    }

});

// Start the server
const PORT = 4000;
io.listen(PORT);

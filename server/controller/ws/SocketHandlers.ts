import {Socket} from "socket.io";
import userServices from "../../services/UserServices";
import serverServices from "../../services/ServerServices";
import type {Request} from "express";
import {Message} from "../../domain/Message";
import {Credentials} from "../../domain/user/Credentials";

module.exports = (io: Socket, socket: Socket, userServices: userServices, serverServices: serverServices) => {
    console.log(`Client connected to main`);

    const req = socket.request as Request;
    socket.join(req.session.id);

    const id = socket.id
    const credentials: Credentials = socket.data

    const createServer = async function (data: { serverName: string, serverDescription: string, serverIcon: string }) {
        const {serverName, serverDescription, serverIcon} = data;

        const owner = await userServices.getUserById(credentials.id);

        if(!owner){
            console.log("No owner")
            socket.to(id).emit("createServerError", "Error creating server.");
            return;
        }

        const server = await serverServices.createServer(serverName, serverDescription, owner, serverIcon);

        if(!server){
            console.log("No server")
            socket.to(id).emit("createServerError", "Error creating server.");
            return;
        }

        socket.join(server.id.toString(10));
        io.to(id).emit("createServerSuccess", server);
    };
    const joinServer = async function (data: {serverName: string }) {
        const {serverName} = data

        const owner = await userServices.getUserById(credentials.id);

        if(!owner){
            console.log("No owner")
            socket.to(id).emit("joinServerError", "Error joining server.");
            return;
        }

        const server = await serverServices.serverExistsByName(serverName)

        if(!server){
            console.log("No server found.");
            socket.to(id).emit("joinServerError", "Error joining server.");
            return;
        }

        const serverFound = await serverServices.addUserToServer(server.id, owner)

        if(!serverFound){
            console.log("No server found after add.");
            socket.to(id).emit("joinServerError", "Error joining server.");
            return;
        }

        socket.join(serverFound.id.toString(10));
        io.to(serverFound.id.toString(10)).emit("memberJoined", {user: owner, serverId: serverFound.id});
        io.to(id).emit("joinServerSuccess", serverFound);
    };
    const createChannel = async function (data: {serverId: number, channelName: string, channelDescription: string}) {
        const {serverId, channelName, channelDescription} = data;

        const server = await serverServices.serverExistsById(serverId)

        if(!server){
            console.log("Server does not exist");
            socket.to(id).emit("createChannelError", "Error occurred while creating channel.");
            return;
        }

        const channel = await serverServices.createChannel(serverId, channelName, channelDescription);

        if(!channel){
            console.log("Channel does not exist");
            socket.to(id).emit("createChannelError", "Error occurred while creating channel.");
            return;
        }

        io.to(serverId.toString(10)).emit("createChannelSuccess", {serverId: serverId, channel: channel});
    };
    const messageServer = async function (data: {serverId: number, channelId: number, message: string}) {
        const {serverId, channelId, message} = data

        const server = await serverServices.serverExistsById(serverId)

        if(!server){
            console.log("Server not found")
            socket.to(id).emit("messageServerError", "Error occurred while messaging channel.");
            return;
        }

        const channelFound = await serverServices.channelExists(server.id, channelId);

        if(!channelFound){
            console.log("Channel not found")
            socket.to(id).emit("messageServerError", "Error occurred while messaging channel.");
            return;
        }

        const newMessage: Message = {author: credentials.username, message: message}

        await serverServices.messageChannel(server.id, channelFound.id, newMessage);

        io.to(serverId.toString(10)).emit("messageServerSuccess", {serverId: serverId, channelId: channelId, message: newMessage});
    };
    const leaveServer = async function (serverId: number) {
        const server = await serverServices.serverExistsById(serverId)

        if(!server){
            socket.to(id).emit("leaveServerError", serverId);
            return;
        }

        socket.leave(server.id.toString(10));
        io.to(id).emit("leaveServerSuccess", "Left successfully");
    };
    const disconnect = async function () {
        console.log(`Client disconnected from main`);
    };


    socket.on("createServer", createServer);
    socket.on("joinServer", joinServer);
    socket.on("createChannel", createChannel);
    socket.on("messageServer", messageServer);
    socket.on("leaveServer", leaveServer);
    socket.on("disconnect", disconnect);
}

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
    const user: UserProfile = {id: credentials.id, username: credentials.username}

    const createServer = async function (data: { serverName: string, serverDescription: string, serverIcon: string }) {
        const {serverName, serverDescription, serverIcon} = data;

        const server = await serverServices.createServer(serverName, serverDescription, user, serverIcon);

        socket.join(server.id.toString(10));
        io.to(id).emit("createServerSuccess", server);
    };
    const joinServer = async function (data: {serverId: number }) {
        const {serverId} = data

        const serverFound = await serverServices.addUserToServer(serverId, user)

        socket.join(serverFound.id.toString(10));
        io.to(serverFound.id.toString(10)).emit("memberJoined", {user: {id: credentials.id, username: credentials.username}, serverId: serverFound.id});
        io.to(id).emit("joinServerSuccess", serverFound);
    };
    const createChannel = async function (data: {serverId: number, channelName: string, channelDescription: string}) {
        const {serverId, channelName, channelDescription} = data;

        const channel = await serverServices.createChannel(serverId, channelName, channelDescription);

        io.to(serverId.toString(10)).emit("createChannelSuccess", {serverId: serverId, channel: channel});
    };
    const messageServer = async function (data: {serverId: number, channelId: number, message: string}) {
        const {serverId, channelId, message} = data

        const newMessage: Message = {author: user.username, message: message}
        await serverServices.messageChannel(serverId, channelId, newMessage);

        io.to(serverId.toString(10)).emit("messageServerSuccess", {serverId: serverId, channelId: channelId, message: newMessage});
    };
    const leaveServer = async function (serverId: number) {
        const server = await serverServices.leaveServer(serverId, user)

        socket.leave(server.toString());
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

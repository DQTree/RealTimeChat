import {Socket} from "socket.io";
import userServices from "../../services/UserServices";
import serverServices from "../../services/ServerServices";
import type {Request} from "express";
import {Message} from "../../domain/Message";
import {Credentials} from "../../domain/user/Credentials";
import {UserProfile} from "../../domain/user/UserProfile";

module.exports = (io: Socket, socket: Socket, userServices: userServices, serverServices: serverServices) => {
    console.log(`Client connected to main`);

    const req = socket.request as Request;
    socket.join(req.session.id);

    const id = socket.id
    const credentials: Credentials = socket.data
    const user: UserProfile = {id: credentials.id, username: credentials.username}

    const sendUserServers = async () => {
        try {
            const userServers = await serverServices.getUserServers(user);
            userServers.forEach(server => {
                socket.join(server.id.toString(10));
            });
            io.to(id).emit("userServersSuccess", userServers);
        } catch (error: any) {
            const errorMessage: string = error.message;
            io.to(id).emit("userServersError", errorMessage);
        }
    };
    const createServer = async function (data: { serverName: string, serverDescription: string, serverIcon: string }) {
        try {
            const {serverName, serverDescription, serverIcon} = data;

            const server = await serverServices.createServer(serverName, serverDescription, user, serverIcon);

            socket.join(server.id.toString(10));
            io.to(id).emit("createServerSuccess", server);
        } catch (error: any){
            const errorMessage: string = error.message
            io.to(id).emit("createServerError", errorMessage);
        }
    };
    const joinServer = async function (data: { serverId: number }) {
        try {
            const {serverId} = data

            const serverFound = await serverServices.addUserToServer(serverId, user)

            socket.join(serverFound.id.toString(10));
            io.to(serverFound.id.toString(10)).emit("memberJoined", {user: {id: credentials.id, username: credentials.username}, serverId: serverFound.id});
            io.to(id).emit("joinServerSuccess", serverFound);
        } catch (error: any){
            const errorMessage: string = error.message
            io.to(id).emit("joinServerError", errorMessage);
        }
    };
    const createChannel = async function (data: {serverId: number, channelName: string, channelDescription: string}) {
        try {
            const {serverId, channelName, channelDescription} = data;

            const channel = await serverServices.createChannel(serverId, channelName, channelDescription);

            io.to(serverId.toString(10)).emit("createChannelSuccess", {serverId: serverId, channel: channel});
        } catch (error: any){
            const errorMessage: string = error.message
            io.to(id).emit("createChannelError", errorMessage);
        }
    };
    const messageServer = async function (data: {serverId: number, channelId: number, message: string}) {
        try {
            const {serverId, channelId, message} = data

            const newMessage: Message = {author: user.username, message: message}
            await serverServices.messageChannel(serverId, channelId, newMessage);

            io.to(serverId.toString(10)).emit("messageServerSuccess", {serverId: serverId, channelId: channelId, message: newMessage});
        } catch (error: any){
            const errorMessage: string = error.message
            io.to(id).emit("messageServerError", errorMessage);
        }
    };
    const leaveServer = async function (serverId: number) {
        try {
            const server = await serverServices.leaveServer(serverId, user)

            socket.leave(server.toString());
            io.to(id).emit("leaveServerSuccess", "Left successfully");
        } catch (error: any){
            const errorMessage: string = error.message
            io.to(id).emit("leaveServerError", errorMessage);
        }
    };
    const disconnect = async function () {
        console.log(`Client disconnected from main`);
    };

    socket.on("userServers", sendUserServers);
    socket.on("createServer", createServer);
    socket.on("joinServer", joinServer);
    socket.on("createChannel", createChannel);
    socket.on("messageServer", messageServer);
    socket.on("leaveServer", leaveServer);
    socket.on("disconnect", disconnect);
}

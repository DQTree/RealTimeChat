'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {CustomServer} from "@/components/domain/CustomServer";
import {CustomChannel} from "@/components/domain/CustomChannel";
import {Message} from "@/components/domain/Message";
import {io} from "socket.io-client";
import {User} from "@/components/domain/User";

interface SocketContextType {
    createServer: (serverName: string, serverDescription: string, serverIcon: string) => void;
    joinServer: (serverId: number) => void;
    createChannel: (channelName: string, channelDescription: string) => void;
    messageServer: (message: string) => void;
    leaveServer: (serverName: string) => void;
    changeServer: (serverId: number) => void;
    changeChannel: (channelId: number) => void;
    currentServer: number;
    currentChannel: number;
    servers: CustomServer[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const API_URL = 'http://localhost:4000';
const socket = io(API_URL, {
    withCredentials: true
});

export function SocketProvider({ children }: { children: ReactNode }) {

    const [servers, setServers] = useState<CustomServer[]>([])
    const [currentServer, setCurrentServer] = useState(0);
    const [currentChannel, setCurrentChannel] = useState(0);

    function createServer(serverName: string, serverDescription: string, serverIcon: string){
        socket.emit("createServer", {serverName: serverName, serverDescription: serverDescription, serverIcon: serverIcon});
    }

    function joinServer(serverId: number){
        socket.emit("joinServer", {serverId: serverId});
    }

    function createChannel(channelName: string, channelDescription: string){
        socket.emit("createChannel", {serverId: servers[currentServer].id, channelName: channelName, channelDescription: channelDescription});
    }

    function messageServer(message: string) {
        socket.emit("messageServer", {serverId: servers[currentServer].id, channelId: servers[currentServer].channels[currentChannel].id, message: message});
    }

    function leaveServer(serverId: string){
        socket.emit("leaveServer", {serverId: serverId});
    }

    function changeServer(serverId: number) {
        const server = servers.findIndex(s => s.id === serverId)
        setCurrentServer(server);
    }

    function changeChannel(channelId: number){
        const channel = servers[currentServer].channels.findIndex(s => s.id === channelId);
        setCurrentChannel(channel)
    }

    useEffect(() => {
        function onCreateServerSuccess(server: CustomServer) {
            console.log(server)
            setServers(prev => [...prev, server]);
            setCurrentServer(servers.length-1)
        }

        function onJoinServerSuccess(server: CustomServer) {
            console.log(server)
            setServers(prev => [...prev, server]);
            setCurrentServer(servers.length-1)
        }

        function onCreateChannelSuccess(data: {serverId: number, channel: CustomChannel}) {
            const {serverId, channel} = data;

            setServers(prev => {
                return prev.map(server => {
                    if (server.id === serverId) {
                        setCurrentChannel(server.channels.length-1);
                        return {
                            ...server,
                            channels: [...server.channels, channel]
                        };
                    }
                    return server;
                });
            });
        }

        function onMemberJoinSuccess(data: {user: User, serverId: number}){
            const {user, serverId} = data

            setServers(prev => {
                return prev.map(server => {
                    if (server.id === serverId) {
                        return {
                            ...server,
                            users: [...server.users, user]
                        };
                    }
                    return server;
                });
            });
        }

        function onMessageServerSuccess(data: {serverId: number, channelId: number, message: Message}) {
            setServers(prevState => {
                return prevState.map(server => {
                    if (server.id === data.serverId) {
                        return {
                            ...server,
                            channels: server.channels.map(channel => {
                                if (channel.id === data.channelId) {
                                    return {
                                        ...channel,
                                        messages: [...channel.messages, data.message]
                                    };
                                }
                                return channel;
                            })
                        };
                    }
                    return server;
                });
            });
        }

        function onLeaveServerSuccess(serverId: number) {
            setServers(prevState => {
                return prevState.filter(s => s.id != serverId);
            })
        }

        socket.on("createServerSuccess", onCreateServerSuccess)
        socket.on("joinServerSuccess", onJoinServerSuccess)
        socket.on("memberJoined", onMemberJoinSuccess)
        socket.on("createChannelSuccess", onCreateChannelSuccess)
        socket.on("messageServerSuccess", onMessageServerSuccess)
        socket.on("leaveServerSuccess", onLeaveServerSuccess)

        return () => {
            socket.off("createServerSuccess", onCreateServerSuccess)
            socket.off("joinServerSuccess", onJoinServerSuccess)
            socket.off("memberJoined", onMemberJoinSuccess)
            socket.off("createChannelSuccess", onCreateChannelSuccess)
            socket.off("messageServerSuccess", onMessageServerSuccess)
            socket.off("leaveServerSuccess", onLeaveServerSuccess)
        }
    }, [])

    return (
        <SocketContext.Provider
            value={{
                createServer,
                joinServer,
                createChannel,
                messageServer,
                leaveServer,
                changeServer,
                currentServer,
                currentChannel,
                changeChannel,
                servers
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}

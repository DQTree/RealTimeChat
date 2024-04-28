'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {CustomServer} from "@/components/domain/CustomServer";
import {socket} from "@/components/socket";
import {CustomChannel} from "@/components/domain/CustomChannel";
import {User} from "@/components/domain/User";
import {Message} from "@/components/domain/Message";

interface SocketContextType {
    login: (username: string) => void;
    createServer: (serverName: string, serverDescription: string) => void;
    joinServer: (serverName: string) => void;
    createChannel: (channelName: string, channelDescription: string) => void;
    messageServer: (message: string) => void;
    leaveServer: (serverName: string) => void;
    changeServer: (serverId: number) => void;
    changeChannel: (channelId: number) => void;
    currentServer: number;
    currentChannel: number;
    isLoggedIn: User | undefined;
    servers: CustomServer[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<User | undefined>(undefined);
    const [servers, setServers] = useState<CustomServer[]>([])
    const [currentServer, setCurrentServer] = useState(0);
    const [currentChannel, setCurrentChannel] = useState(0);

    function login(username: string){
        socket.emit("login", username);
    }

    function createServer(serverName: string, serverDescription: string){
        socket.emit("createServer", {serverName: serverName, serverDescription: serverDescription});
    }

    function joinServer(serverName: string){
        socket.emit("joinServer", {username: isLoggedIn!.name, serverName: serverName});
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
        console.log(server)
        setCurrentServer(server);
    }

    function changeChannel(channelId: number){
        const channel = servers[currentServer].channels.findIndex(s => s.id === channelId);
        setCurrentChannel(channel)
    }

    useEffect(() => {
        function onLoginSuccess(data: {user: User, servers: CustomServer[]}) {
            const {user, servers} = data
            setIsLoggedIn(user)
            setServers(servers)
        }

        function onCreateServerSuccess(server: CustomServer) {
            setServers(prev => [...prev, server]);
            setCurrentServer(servers.length-1)
        }

        function onJoinServerSuccess(server: CustomServer) {
            setServers(prev => [...prev, server]);
            setCurrentServer(servers.length-1)
        }

        function onCreateChannelSuccess(data: {serverId: number, channel: CustomChannel}) {
            const {serverId, channel} = data;
            setServers(prev => {
                return prev.map(server => {
                    if (server.id === serverId) {
                        return {
                            ...server,
                            channels: [...server.channels, channel]
                        };
                    }
                    return server;
                });
            });
            setCurrentChannel(channel.id);
        }

        function onMemberJoinSuccess(data: {user: User, serverId: number}){
            const {user, serverId} = data

            console.log(user)

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

        function onLeaveServerSuccess(response: string) {
            alert(response)
        }

        socket.on("loginSuccess", onLoginSuccess)
        socket.on("createServerSuccess", onCreateServerSuccess)
        socket.on("joinServerSuccess", onJoinServerSuccess)
        socket.on("memberJoined", onMemberJoinSuccess)
        socket.on("createChannelSuccess", onCreateChannelSuccess)
        socket.on("messageServerSuccess", onMessageServerSuccess)
        socket.on("leaveServerSuccess", onLeaveServerSuccess)

        return () => {
            socket.off("loginSuccess", onLoginSuccess)
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
                login,
                createServer,
                joinServer,
                createChannel,
                messageServer,
                leaveServer,
                changeServer,
                currentServer,
                currentChannel,
                changeChannel,
                isLoggedIn,
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

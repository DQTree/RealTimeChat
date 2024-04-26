'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {CustomServer} from "@/components/domain/CustomServer";
import {socket} from "@/components/socket";
import {func} from "prop-types";

interface SocketContextType {
    login: (username: string) => void;
    createServer: (serverName: string, description: string) => void;
    createChannel: (channelName: string) => void;
    joinServer: (server: string) => void;
    joinChannel: (channel: string) => void;
    message: (message: string) => void;
    servers: CustomServer[];
    channels: CustomChannel[];
    currentServer: CustomServer | undefined;
    currentChannel: CustomChannel | undefined;
    currentUsername: string | undefined;
}

interface ServerResponse {
    status: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(socket.connected);

    const [currentUsername, setCurrentUsername] = useState<string>("");
    const [currentServer, setServer] = useState<CustomServer | undefined>(undefined)
    const [servers, setServers] = useState<CustomServer[]>([])
    const [currentChannel, setChannel] = useState<CustomChannel | undefined>(undefined);
    const [channels, setChannels] = useState<CustomChannel[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);

    function login(username: string){
        setLoading(true);

        socket.emit("login", username, () => {
            setCurrentUsername(username);
            setLoading(false);
        });
    }

    function createServer(serverName: string, description: string){
        setLoading(true);

        socket.emit("createServer", {serverName, description}, (response: ServerResponse) => {
            console.log(response.status)
        });
    }

    function joinServer(channelName: string){
        setLoading(true);

        socket.emit("joinServer", channelName, (response: ServerResponse) => {
            console.log(response.status)
        });
    }

    function createChannel(channelName: string){
        setLoading(true);

        socket.emit("createChannel", channelName, (response: ServerResponse) => {
            console.log(response.status)
        });
    }

    function joinChannel(channelName: string){
        setLoading(true);

        socket.emit("joinChannel", channelName, (response: ServerResponse) => {
            console.log(response.status)
        });
    }

    function message(message: string){
        setLoading(true);

        socket.emit("message", {serverName: currentServer!.name, channelName: currentChannel!.name, message: message}, (response: ServerResponse) => {
            console.log(response.status)
        });
    }

    useEffect(() => {
        function onLogin(response: CustomServer[]){
            setServers(response)
            console.log(response);
        }

        function onCreateServer(response: CustomServer[]){
            setServers(response)
            console.log(response)
        }

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("loginSuccess", onLogin);
        socket.on("createServerSuccess", onCreateServer);
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("loginSuccess", onLogin);
            socket.off("createServerSuccess", onCreateServer)
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        }
    }, [socket])

    return (
        <SocketContext.Provider
            value={{
                login,
                createServer,
                createChannel,
                joinServer,
                joinChannel,
                message,
                servers,
                channels,
                currentServer,
                currentChannel,
                currentUsername
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

'use client'

import {createContext, ReactNode, useContext, useState} from "react";
import {socket} from "@/components/socket";

interface SocketContextType {
    joinServer: (server: string) => void;
    joinChannel: (channel: string) => void;
    sendMessageToChannel: (message: string) => void;
}

type ServersState = Map<string, Map<string, string[]>>;

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: {children: ReactNode}) {
    const [server, setServer] = useState<string>('');
    const [channel, setChannel] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [servers, setServers] = useState<ServersState>(new Map());

    function joinServer(server: string) {
        socket.emit('joinServer', {server}, () => {
            if(!servers.has(server)) {
                const newServersState = new Map(servers);
                newServersState.set(server, new Map());
                setServers(newServersState);
            }
            setServer(server);
        });
    }

    function joinChannel(channel: string) {
        setIsLoading(true);

        socket.emit('joinChannel', {server, channel, username}, () => {
            setIsLoading(false);
            setChannel(channel);
        })
    }

    function sendMessageToChannel(message: string) {
        setIsLoading(true);

        socket.emit('sendMessageToChannel', {server, channel, message}, () => {
            setIsLoading(false);
        });
    }

    return(
        <SocketContext.Provider
        value={{
            joinServer,
            joinChannel,
            sendMessageToChannel,
        }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within an SocketProvider');
    }
    return context;
}

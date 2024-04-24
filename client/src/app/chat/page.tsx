'use client'

import React, { useEffect, useState } from "react";
import { socket } from "@/components/socket";
import { Events } from "@/components/socket/Events";
import { RoomJoin } from "@/components/socket/RoomJoin";
import TypingIndicator from "@/components/chat/TypingIndicator";
import RoomChat from "@/components/chat/RoomChat";

interface Message {
    username: string;
    message: string;
}

export default function Page() {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [fooEvents, setFooEvents] = useState<Message[]>([]);
    const [roomId, setRoomId] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    function handleJoinRoom(roomId: string) {
        if (roomId) {
            setRoomId(roomId);
        }
    }

    function handleLeaveRoom() {
        if (roomId) {
            socket.emit('leaveRoom', roomId);
            setRoomId('');
        }
    }

    function onConnect() {
        setIsConnected(true);
    }

    function onDisconnect() {
        setIsConnected(false);
    }

    function onMessage(value: Message) {
        setFooEvents(previous => [...previous, value]);
    }

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message', onMessage);
        };
    }, []);

    return (
        <div>
            <Events events={fooEvents} />
            {roomId ? <button onClick={handleLeaveRoom}>Leave room {roomId}</button> : null}
            {!roomId ? (
                <label>
                    Username:
                    <input onChange={e => setUsername(e.target.value)} />
                </label>
            ) : null}
            <TypingIndicator />
            {!roomId ? <RoomJoin username={username} joinRoom={handleJoinRoom} /> : null}
            {roomId ? <RoomChat username={username} room={roomId} /> : null}
        </div>
    );
}

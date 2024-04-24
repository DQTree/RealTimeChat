'use client'

import React, {FormEvent, useState} from "react";
import {socket} from "@/components/socket";

export default function RoomChat({username, room} : {username: string, room: string}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState('');

    let typingTimer: string | number | NodeJS.Timeout | undefined;

    function onMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        socket.timeout(2000).emit('message', {room, message}, () => {
            setIsLoading(false);
        });
    }

    return (
        <form onSubmit={onMessage}>
            <label>
                Message:
                <input onChange={e => setMessage(e.target.value)} />
            </label>
            <button type="submit" disabled={isLoading}>Submit</button>
        </form>
    )
}

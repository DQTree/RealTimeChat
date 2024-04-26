import React, {FormEvent, FormEventHandler, useEffect, useState} from 'react';
import { socket } from '@/components/socket';
import {useSocket} from "@/components/context/SocketContext";
import {Server} from "node:net";

export function RoomJoin() {
    const {joinServer} = useSocket()
    const [room, setRoom] = useState<string>('')

    return (
        <div>
            <form onSubmit={() => joinServer(room)}>
                <label>
                    Room name:
                    <input onChange={e => setRoom(e.target.value)}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

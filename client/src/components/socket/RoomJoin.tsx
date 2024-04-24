import React, {FormEvent, FormEventHandler, useEffect, useState} from 'react';
import { socket } from '@/components/socket';

export function RoomJoin(
    {username, joinRoom}: {username: string, joinRoom: (id: string) => void},
) {
    const [room, setRoom] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function onRoomJoin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(2000).emit('joinRoom', {room, username}, () => {
            setIsLoading(false);
            joinRoom(room)
        })
    }
    return (
        <div>
            <form onSubmit={onRoomJoin}>
                <label>
                    Room name:
                    <input onChange={e => setRoom(e.target.value)}/>
                </label>
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
        </div>
    );
}

import React from 'react';

interface Message {
    username: string;
    message: string;
}

// @ts-ignore
export function Events({ events }: {events: Message[]}) {
    return (
        <ul>
            {
                // @ts-ignore
                events.map((event, index) =>
                    <li key={ index }>{event.username}: {event.message}</li>
                )
            }
        </ul>
    );
}

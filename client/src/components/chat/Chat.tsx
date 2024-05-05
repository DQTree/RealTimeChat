import './chat.css'
import {useSocket} from "@/components/context/SocketContext";
import React, {Fragment} from 'react';
import {useState} from "react";

export default function Chat() {
    const { servers, currentServer, messageServer, currentChannel } = useSocket();
    const [chatMessage, setChatMessage] = useState<string>('');

    function handleKeyDown(event: { key: string }) {
        if (event.key === 'Enter' && chatMessage !== '') {
            messageServer(chatMessage);
            setChatMessage('');
        }
    }

    const extractURLs = (str: string) => {
        const urlRegex = /(https?:\/\/\S+)/g;
        const parts = str.split(urlRegex); // Split the string by URLs
        const result: JSX.Element[] = [];
        for (let i = 0; i < parts.length; i++) {
            result.push(<span key={`part-${i}`}>{parts[i]}</span>); // Add the text part
            if (i < parts.length - 1) { // Check if there is a URL at this index
                const url = parts[i + 1].match(urlRegex); // Extract the URL
                if (url && url.length > 0) {
                    result.push( // Add the URL as a link
                        <a key={`url-${i}`} href={url[0]} target="_blank" rel="noopener noreferrer">
                            {url[0]}
                        </a>
                    );
                    i++; // Skip the next part (URL)
                }
            }
        }
        return result;
    };

    return (
        <div id="chat">
            <div id="messages">
                {servers[currentServer] &&
                    servers[currentServer].channels[currentChannel] &&
                    servers[currentServer].channels[currentChannel].messages.map((message, index) => (
                        <div key={`${message.author}-${index}`}>
                            {message.author}:{' '}
                            {extractURLs(message.message).map((element, i) => (
                                <Fragment key={i}>{element}</Fragment>
                            ))}
                        </div>
                    ))}
            </div>
            {servers[currentServer] && (
                <div id="sendMessage">
                    <input
                        onChange={(e) => setChatMessage(e.target.value)}
                        value={chatMessage}
                        type="text"
                        id="sendMessageInput"
                        placeholder={
                            'Send message to ' +
                            (servers[currentServer].channels[currentChannel]?.name || '') // Ensure currentChannel is not null
                        }
                        onKeyDown={handleKeyDown}
                    />
                </div>
            )}
        </div>
    );
}

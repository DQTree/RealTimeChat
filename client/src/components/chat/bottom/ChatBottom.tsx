import React, {Fragment, useState} from "react";
import {CustomServer} from "@/components/domain/CustomServer";
import {useSocket} from "@/components/context/SocketContext";
import Member from "@/components/members/Member";

import styles from './bottom.module.css'

export default function ChatBottom({currentServer, currentChannel, isShowMembers}: {
    currentServer: CustomServer,
    currentChannel: number,
    isShowMembers: boolean
}) {
    const {messageServer} = useSocket()

    function handleKeyDown(event: { key: string }) {
        if (event.key === 'Enter' && chatMessage !== '') {
            messageServer(chatMessage);
            setChatMessage('');
        }
    }
    const [chatMessage, setChatMessage] = useState<string>('');

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
        <div className={styles.bottom}>
            <div className={styles.chatArea}>
                <div className={styles.messages}>
                    {currentServer &&
                        currentServer.channels[currentChannel] &&
                        currentServer.channels[currentChannel].messages.map((message, index) => (
                            <div key={`${message.author}-${index}`}>
                                {message.author}:{' '}
                                {extractURLs(message.message).map((element, i) => (
                                    <Fragment key={i}>{element}</Fragment>
                                ))}
                            </div>
                        ))}
                </div>
                {currentServer && (
                    <div className={styles.sendMessage}>
                        <input
                            onChange={(e) => setChatMessage(e.target.value)}
                            value={chatMessage}
                            type="text"
                            className={styles.sendMessageInput}
                            placeholder={'Send message to ' + (currentServer.channels[currentChannel]?.name || '')}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                )}
            </div>
            {isShowMembers &&
                <div className={styles.memberArea}>
                    {currentServer && currentServer.users.map((user) => (
                        <Member name={user.username} icon={""} status={true}></Member>))}
                </div>
            }
        </div>
    )
}

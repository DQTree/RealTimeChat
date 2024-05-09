import {useSocket} from "@/components/context/SocketContext";
import React, {useState} from 'react';
import ChatTop from "@/components/chat/top/ChatTop";
import ChatBottom from "@/components/chat/bottom/ChatBottom";

import styles from './chat.module.css'

export default function ChatArea() {
    const { servers, currentServer, currentChannel } = useSocket();
    const [showMembers, setShowMembers] = useState(false);

    return (
        <div className={styles.mainWindow}>
            {servers[currentServer] && <ChatTop channel={servers[currentServer].channels[currentChannel]} showMembersToggle={() => setShowMembers(!showMembers)} />}
            <ChatBottom currentServer={servers[currentServer]} currentChannel={currentChannel} isShowMembers={showMembers}/>
        </div>
    );
}

import './chat.css'
import {useSocket} from "@/components/context/SocketContext";
import {useState} from "react";

export default function Chat() {
    const {servers, currentServer, messageServer, currentChannel} = useSocket()
    const [chatMessage, setChatMessage] = useState<string>('')

    function handleKeyDown(event: { key: string; }) {
        if (event.key === 'Enter' && chatMessage != '') {
            messageServer(chatMessage)
            setChatMessage('')
        }
    }

    return(
        <div id="chat">
            <div id="messages">
                {servers[currentServer] && servers[currentServer].channels[currentChannel] && servers[currentServer].channels[currentChannel].messages.map((message, index) => (
                    <div key={`${message.author}-${index}`}>
                        {message.author}: {message.message}
                    </div>
                ))}
            </div>
            {servers[currentServer] && <div id="sendMessage">
                <input
                    onChange={(e) => setChatMessage(e.target.value)}
                    value={chatMessage}
                    type="text"
                    id="sendMessageInput"
                    placeholder={"Send message to " + (servers[currentServer].channels[currentChannel].name || "")} // Ensure currentChannel is not null
                    onKeyDown={handleKeyDown}
                />
            </div>}
        </div>
    )
}

import {useSocket} from "@/components/context/SocketContext";

import './taskbar.css'
import {useState} from "react";
import {useOverlay} from "@/components/context/OverlayContext";

import Button from 'react-bootstrap/Button';
import LoginForm from "@/components/taskbar/login/LoginForm";
import AddChannelForm from "@/components/channel/AddChannelForm";

export default function TaskBar(){
    const {servers, currentServer, currentChannel, isLoggedIn, changeChannel } = useSocket()
    const {handleShow} = useOverlay()
    const [loginUsername, setLoginUsername] = useState("")

    return (
        <div id="taskbar">
            <div id="channels">
                {servers[currentServer] && servers[currentServer].channels && servers[currentServer].channels.map((channel, index) => (
                    <Button
                        key={`${channel.name}-${channel.id.toString(10)}`}
                        className="channel"
                        id={channel.id.toString(10)}
                        onClick={() => {changeChannel(channel.id)}}
                        style={{ backgroundColor: currentChannel == index ? 'rgba(128, 128, 128, .5)' : 'transparent' }}
                    >
                        # {channel.name}
                    </Button>
                ))}
                <Button variant="primary" onClick={() => handleShow(<AddChannelForm/>)}>Add channel</Button>
            </div>
            <div id="userbar">
                {!isLoggedIn ? <Button variant="primary" onClick={() => handleShow(<LoginForm/>)}>
                    Login
                </Button> : <div id="user">{isLoggedIn.name}</div>
                }
            </div>
        </div>
    )
}

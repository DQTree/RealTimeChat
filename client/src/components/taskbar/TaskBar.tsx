import {useSocket} from "@/components/context/SocketContext";

import './taskbar.css'
import {useState} from "react";
import {useOverlay} from "@/components/context/OverlayContext";

import Button from 'react-bootstrap/Button';
import LoginForm from "@/components/taskbar/login/LoginForm";
import AddChannelForm from "@/components/channel/AddChannelForm";

export default function TaskBar(){
    const {servers, currentServer, isLoggedIn, changeChannel } = useSocket()
    const {handleShow} = useOverlay()
    const [loginUsername, setLoginUsername] = useState("")

    return (
        <div id="taskbar">
            <div id="channels">
                {servers[currentServer] && servers[currentServer].channels && servers[currentServer].channels.map((channel) => (
                    <Button key={channel.name} className="channel" id={channel.id.toString(10)} onClick={() => {changeChannel(channel.id)}}>{channel.name}</Button>
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

import {useSocket} from "@/components/context/SocketContext";

import './taskbar.css'
import {useOverlay} from "@/components/context/OverlayContext";

import AddChannelForm from "@/components/channel/AddChannelForm";
import {useAuth} from "@/components/context/AuthContext";
import {Button} from "@mui/material";

export default function TaskBar(){
    const {servers, currentServer, currentChannel, changeChannel } = useSocket()
    const {handleShow} = useOverlay()

    return (
        <div id="taskbar">
            <div id="server">
                {servers[currentServer] && <div id="server-card">
                    <h1 id="server-card-name">
                        {servers[currentServer].name}
                    </h1>
                    <h2 id="server-card-description">
                        {servers[currentServer].description}
                    </h2>
                </div>
                }
            </div>
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
                <Button onClick={() => handleShow(<AddChannelForm/>)}>Add channel</Button>
            </div>
            <div id="userbar">
                {/* !isLoggedIn ? <Button variant="primary" onClick={() => handleShow(<LoginForm/>)}>
                    Login
                </Button> : <div id="user">{isLoggedIn.name}</div>*/}
                <div id="user"></div>
            </div>
        </div>
    )
}

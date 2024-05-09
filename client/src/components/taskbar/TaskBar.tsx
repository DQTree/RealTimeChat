import {useSocket} from "@/components/context/SocketContext";
import AddChannelForm from "@/components/channel/AddChannelForm";
import {Button} from "@mui/material";
import {useOverlay} from "@/components/context/OverlayContext";
import ServerDescription from "@/components/taskbar/server/ServerDescription";

import styles from './taskbar.module.css'

export default function TaskBar(){
    const {servers, currentServer, currentChannel, changeChannel } = useSocket()
    const {handleShow} = useOverlay()

    return (
        <div className={styles.taskbar}>
            <div className={styles.server}>
                {servers[currentServer] && <ServerDescription server={servers[currentServer]}/>}
            </div>
            <div className={styles.channels}>
                {servers[currentServer] && servers[currentServer].channels && servers[currentServer].channels.map((channel, index) => (
                    <Button
                        key={`${channel.name}-${channel.id.toString(10)}`}
                        className={styles.channel}
                        id={channel.id.toString(10)}
                        onClick={() => changeChannel(channel.id)}
                        style={{ backgroundColor: currentChannel == index ? 'rgba(128, 128, 128, .5)' : 'transparent' }}
                    >
                        # {channel.name}
                    </Button>
                ))}
                <Button onClick={() => handleShow(<AddChannelForm/>)}>Add channel</Button>
            </div>
            <div className={styles.userbar}>
                {/* !isLoggedIn ? <Button variant="primary" onClick={() => handleShow(<LoginForm/>)}>
                    Login
                </Button> : <div id="user">{isLoggedIn.name}</div>*/}
                <div className={styles.user}></div>
            </div>
        </div>
    )
}

import {useSocket} from "@/components/context/SocketContext";

import './taskbar.css'
import {useState} from "react";

export default function TaskBar(){
    const {login, currentServer, } = useSocket()
    const [loginUsername, setLoginUsername] = useState("")

    return (
        <div id="taskbar">
            <div id="channels">
                {currentServer?.channels && Object.entries(currentServer.channels).map(([_, channel]) => (
                    <div key={channel[0].name} className="channel"></div>
                ))}
            </div>
            <div id="userbar">
                <input onChange={(e) => setLoginUsername(e.target.value)}/>
                <button onClick={() => login(loginUsername)}>Login</button>
            </div>
        </div>
    )
}
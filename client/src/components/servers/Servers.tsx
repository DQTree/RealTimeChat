'use client'

import {useSocket} from "@/components/context/SocketContext";
import ServerButton from "@/components/servers/ServerButton";

import './server.css'
import {useState} from "react";

export default function Servers() {
    const {login, createServer, servers} = useSocket()
    const [isServerAdd, setServerAdd] = useState(false)

    return(
        <div id="servers">
            {Array.from(servers.entries()).map(([serverName, server]) => (
                <ServerButton id={serverName} name={server.name} image={"avb"}/>
            ))}
            <button className="server material-symbols-outlined"
                    onClick={() => setServerAdd(true)}>add
            </button>
            {
                isServerAdd ?
                    <div></div>
                    : ""
            }
        </div>
    )
}

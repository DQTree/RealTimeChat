'use client'

import {useSocket} from "@/components/context/SocketContext";
import ServerButton from "@/components/servers/ServerButton";

import './server.css'
import {useOverlay} from "@/components/context/OverlayContext";
import ServerCreateForm from "@/components/servers/ServerCreateForm";
import { Button } from "@mui/material";


export default function Servers() {
    const {servers} = useSocket()
    const {handleShow} = useOverlay()

    return (
        <div id="servers">
            <Button className="server material-symbols-outlined"
                    onClick={() => {
                    }}
            >
                density_large
            </Button>
            {servers && servers.map((a) => (
                <ServerButton key={a.name} id={a.id} name={a.name} image={a.icon}/>
            ))}
            <Button
                className="server material-symbols-outlined"
                onClick={() => handleShow(<ServerCreateForm/>)}>
                add
            </Button>
        </div>
    )
}

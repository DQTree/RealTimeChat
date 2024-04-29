'use client'

import {useSocket} from "@/components/context/SocketContext";
import ServerButton from "@/components/servers/ServerButton";

import './server.css'
import Button from "react-bootstrap/Button";
import {useOverlay} from "@/components/context/OverlayContext";
import ServerCreateForm from "@/components/servers/ServerCreateForm";

export default function Servers() {
    const {servers} = useSocket()
    const {handleShow} = useOverlay()

    return (
        <div id="servers">
            <button className="server material-symbols-outlined"
                    onClick={() => {
                    }}>density_large
            </button>
            {servers && servers.map((a) => (
                <ServerButton key={a.name} id={a.id} name={a.name} image={a.icon}/>
            ))}
            <Button
                variant="primary"
                className="server material-symbols-outlined"
                onClick={() => handleShow(<ServerCreateForm/>)}>
                add
            </Button>
        </div>
    )
}

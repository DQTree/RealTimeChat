'use client'

import {useSocket} from "@/components/context/SocketContext";
import ServerButton from "@/components/servers/ServerButton";

import './server.css'
import {useOverlay} from "@/components/context/OverlayContext";
import ServerCreateForm from "@/components/servers/ServerCreateForm";
import { Button } from "@mui/material";


export default function Servers() {
    const {servers, changeServer} = useSocket()
    const {handleShow} = useOverlay()

    return (
        <div className={"bg-black flex flex-col flex-nowrap"}>
            {servers && servers.map((a) => (
                <Button className="server" onClick={() => {changeServer(a.id)}}>
                    {a.icon ? <img className={"w-16 rounded-full"} src={a.icon} alt={a.name} /> : a.name[0]}
                </Button>
            ))}
            <Button
                className={"server h-16 m-1 transition ease-out duration-200 rounded-full bg-gray-800 material-symbols-outlined"}
                onClick={() => handleShow(<ServerCreateForm/>)}
            >
                add
            </Button>
        </div>
    )
}

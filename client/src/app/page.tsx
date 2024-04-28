'use client'

import Servers from "@/components/servers/Servers";
import {SocketProvider} from "@/components/context/SocketContext";

import './globals.css'
import TaskBar from "@/components/taskbar/TaskBar";
import {Overlay} from "next/dist/client/components/react-dev-overlay/internal/components/Overlay";
import Chat from "@/components/chat/Chat";
import Members from "@/components/members/Members";
import {OverlayProvider} from "@/components/context/OverlayContext";

export default function Page() {
    return(
        <SocketProvider>
            <OverlayProvider>
                <Servers />
                <TaskBar />
                <Chat />
                <Members />
            </OverlayProvider>
        </SocketProvider>
    )
}

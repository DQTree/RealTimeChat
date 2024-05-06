'use client'

import Servers from "@/components/servers/Servers";
import TaskBar from "@/components/taskbar/TaskBar";
import Chat from "@/components/chat/Chat";
import Members from "@/components/members/Members";

import {SocketProvider} from "@/components/context/SocketContext";
import React from "react";
import {OverlayProvider} from "@/components/context/OverlayContext";

export default function Page() {
    return(
        <div className={"flex flex-row h-full"}>
            <SocketProvider>
                <OverlayProvider>
                    <Servers/>
                    <TaskBar/>
                    <Chat/>
                    <Members/>
                </OverlayProvider>
            </SocketProvider>
        </div>
    )
}

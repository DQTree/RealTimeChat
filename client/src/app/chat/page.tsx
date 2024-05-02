'use client'

import Servers from "@/components/servers/Servers";
import TaskBar from "@/components/taskbar/TaskBar";
import Chat from "@/components/chat/Chat";
import Members from "@/components/members/Members";

import './page.css'
import {SocketProvider} from "@/components/context/SocketContext";
import React, {useEffect, useState} from "react";
import {OverlayProvider} from "@/components/context/OverlayContext";
import {useAuth} from "@/components/context/AuthContext";
import {useRouter} from "next/navigation";

export default function Page() {
    const {isLoggedIn} = useAuth()
    const [loading, isLoading] = useState(true);
    const navigate = useRouter()

    useEffect(() => {
        isLoading(true)
        if(!isLoggedIn) navigate.push('/register')
        isLoading(false)
    }, [])
    return(
        <div id="app">
            {!loading ?
            <SocketProvider>
                <OverlayProvider>
                    <Servers/>
                    <TaskBar/>
                    <Chat/>
                    <Members/>
                </OverlayProvider>
            </SocketProvider> : <div>Loading...</div>}
        </div>
    )
}

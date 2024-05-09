'use client'

import Servers from "@/components/servers/Servers";
import TaskBar from "@/components/taskbar/TaskBar";

import styles from './app.module.css'
import {SocketProvider} from "@/components/context/SocketContext";
import React from "react";
import {OverlayProvider} from "@/components/context/OverlayContext";
import ChatArea from "@/components/chat/ChatArea";

export default function App() {
    return(
        <div className={styles.app}>
            <SocketProvider>
                <OverlayProvider>
                    <Servers/>
                    <TaskBar/>
                    <ChatArea/>
                </OverlayProvider>
            </SocketProvider>
        </div>
    )
}

'use client'

import Servers from "@/components/servers/Servers";
import {SocketProvider} from "@/components/context/SocketContext";

import './globals.css'
import Channels from "@/components/taskbar/TaskBar";
import {Overlay} from "next/dist/client/components/react-dev-overlay/internal/components/Overlay";

export default function Page() {
  return(
      <SocketProvider>
          <Servers>

          </Servers>
          <Channels>

          </Channels>
      </SocketProvider>
  )
}

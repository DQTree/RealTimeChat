'use client'

import Servers from "@/components/servers/Servers";
import {SocketProvider} from "@/components/context/SocketContext";

import './globals.css'

export default function Page() {

  return(
      <div>
          <SocketProvider>
              <Servers>

              </Servers>
          </SocketProvider>
      </div>
  )
}

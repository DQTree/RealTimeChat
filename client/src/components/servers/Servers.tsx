'use client'

import {useSocket} from "@/components/context/SocketContext";

export default function Servers() {
    const {login, createServer, servers} = useSocket()

    return(

        <div id="servers">
            <button onClick={() => login("abc")}>
                X
            </button>
            <button onClick={() => createServer("helloworld", "Test description")}>
                X
            </button>
            <ul>
                {Array.from(servers.entries()).map(([serverName, server]) => (
                    <li key={serverName}>
                        {server.name} : {server.description}
                        <ul>
                            {Array.from(server.channels).map(([channel, messages]) => (
                                <li key={channel.name}>
                                    {channel.name}: {channel.name}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

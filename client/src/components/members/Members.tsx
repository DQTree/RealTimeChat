import './members.css'
import {useSocket} from "@/components/context/SocketContext";

export default function Members() {
    const {currentServer, servers} = useSocket()

    return(
        <div id="members">
            {servers[currentServer] && servers[currentServer].users.map((user) => (
                <div id="member" key={user.id+user.username}>
                    {user.username}:
                </div>
            ))}
        </div>
    )
}

import {useSocket} from "@/components/context/SocketContext";
import {useOverlay} from "@/components/context/OverlayContext";
import ServerCreateForm from "@/components/servers/ServerCreateForm";
import {Add, Close} from "@mui/icons-material";
import {ContextMenuOption, useContextMenu} from "@/components/context/ContextMenuContext";
import {useAuth} from "@/components/context/AuthContext";

import styles from './server.module.css'

export default function Servers() {
    const {servers, changeServer, deleteServer, leaveServer} = useSocket();
    const {handleShow} = useOverlay();
    const {openContextMenu} = useContextMenu();
    const {loggedUser} = useAuth()

    return (
        <div className={styles.servers}>
            {servers &&
                servers.map((server, index) => (
                    <div key={index} onContextMenu={e => {
                        const isOwner = server.owner.some(u => u.id == loggedUser!.id);
                        const isMember = server.users.some(u => u.id == loggedUser!.id); // Assuming members is an array of user IDs
                        const options = isOwner ? [
                            { label: "Delete server", action: () => deleteServer(server.id) }
                        ] : isMember ? [
                            { label: "Leave server", action: () => leaveServer(server.id) }
                        ] : [];
                        openContextMenu(e, options);
                    }}>
                        <button className={styles.server} onClick={() => changeServer(server.id)}>
                            {server.icon ? <img src={server.icon} alt={server.name} /> : server.name[0]}
                        </button>
                    </div>
                ))
            }

            <button className={styles.server} onClick={() => handleShow(<ServerCreateForm/>)}><Add/></button>


        </div>
    );
}

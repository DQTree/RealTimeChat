import {useSocket} from "@/components/context/SocketContext";
import {useOverlay} from "@/components/context/OverlayContext";
import ServerCreateForm from "@/components/servers/ServerCreateForm";
import {Add} from "@mui/icons-material";
import {useContextMenu} from "@/components/context/ContextMenuContext";
import {useAuth} from "@/components/context/AuthContext";
import styled from "styled-components";

import styles from './server.module.css'

const Scrollbar = styled.div`
    &::-webkit-scrollbar {
        width: 4px;
        background: transparent;
    }   

    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 16px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export default function Servers() {
    const {servers, changeServer, deleteServer, leaveServer} = useSocket();
    const {handleShow} = useOverlay();
    const {openContextMenu} = useContextMenu();
    const {loggedUser} = useAuth()

    return (
        <Scrollbar className={styles.servers}>
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
            <div>
                <button className={styles.server} onClick={() => handleShow(<ServerCreateForm/>)}><Add/></button>
            </div>
        </Scrollbar>
    );
}

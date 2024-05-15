import {useSocket} from "@/components/context/SocketContext";
import {useOverlay} from "@/components/context/OverlayContext";
import ServerCreateForm from "@/components/servers/ServerCreateForm";
import {Add} from "@mui/icons-material";
import {useContextMenu} from "@/components/context/ContextMenuContext";
import {useAuth} from "@/components/context/AuthContext";
import styled from "styled-components";

import styles from './server.module.css'
import Server from "@/components/servers/server/Server";

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
    const { servers, changeServer, deleteServer, leaveServer } = useSocket();
    const { handleShow } = useOverlay();
    const { openContextMenu } = useContextMenu();
    const { loggedUser } = useAuth();

    return (
        <Scrollbar className={styles.servers}>
            {servers && loggedUser && servers.map((server) => (
                <Server
                    key={server.id}
                    server={server}
                    user={loggedUser}
                    openContextMenu={openContextMenu}
                    deleteServer={deleteServer}
                    leaveServer={leaveServer}
                    changeServer={changeServer}
                />
            ))}
            <button className={styles.server} onClick={() => handleShow(<ServerCreateForm />)}>
                <Add />
            </button>
        </Scrollbar>
    );
}

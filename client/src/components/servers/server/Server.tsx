import {CustomServer} from "@/components/domain/CustomServer";
import {UserProfile} from "@/components/domain/UserProfile";
import styles from "@/components/servers/server.module.css";
import React from "react";
import {ContextMenuOption} from "@/components/context/ContextMenuContext";

export default function Server({
                                   server,
                                   user,
                                   deleteServer,
                                   openContextMenu,
                                   leaveServer,
                                   changeServer
                               }: {
    server: CustomServer,
    user: UserProfile,
    deleteServer: (serverId: number) => void
    openContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, options: ContextMenuOption[]) => void;
    leaveServer: (serverId: number) => void
    changeServer: (serverId: number) => void
}) {
    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const isOwner = server.owner.some(u => u.id === user.id);
        const isMember = server.users.some(u => u.id === user.id);
        const options = isOwner
            ? [{ label: "Delete server", action: () => deleteServer(server.id) }]
            : isMember
                ? [{ label: "Leave server", action: () => leaveServer(server.id) }]
                : [];
        openContextMenu(e, options);
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <button className={styles.server} onClick={() => changeServer(server.id)}>
                {server.icon ? <img src={server.icon} alt={server.name} /> : server.name[0]}
            </button>
        </div>
    );
}

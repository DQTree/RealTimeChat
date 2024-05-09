import {useSocket} from "@/components/context/SocketContext";
import styles from './server.module.css'
import {useOverlay} from "@/components/context/OverlayContext";
import ServerCreateForm from "@/components/servers/ServerCreateForm";
import {Add, Close} from "@mui/icons-material";


export default function Servers() {
    const {servers, changeServer} = useSocket()
    const {handleShow} = useOverlay()

    return (
        <div className={styles.servers}>
            <button className={styles.server} onClick={() => {}}><Close/></button>

            {servers && servers.map((c, i) => (
                <button className={styles.server} onClick={e => changeServer(c.id)} key={i}>
                    {c.icon ? <img src={c.icon} alt={c.name} /> : c.name[0]}
                </button>
            ))}

            <button className={styles.server} onClick={() => handleShow(<ServerCreateForm/>)}><Add/></button>
        </div>
    )
}

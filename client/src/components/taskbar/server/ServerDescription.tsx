import styles from "@/components/taskbar/taskbar.module.css";
import {CustomServer} from "@/components/domain/CustomServer";

export default function ServerDescription({server}: {server: CustomServer}) {
    return (
        <div className={styles.serverCard}>
            <h1 className={styles.serverCardName}>
                {server.name}
            </h1>
            <h2 className={styles.serverCardDescription}>
                {server.description}
            </h2>
        </div>
    )
}

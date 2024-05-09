import styles from './top.module.css'
import {CustomChannel} from "@/components/domain/CustomChannel";

export default function ChatTop({ channel, showMembersToggle }: {
    channel: CustomChannel,
    showMembersToggle: () => void
}) {
    return (
        <div className={styles.top}>
            <div>
                <h2>
                    {channel.name}
                </h2>
                <h3>{channel.description}</h3>
            </div>
            <div>
                <button onClick={() => showMembersToggle()}>
                    Show
                </button>
            </div>
        </div>
    )
}

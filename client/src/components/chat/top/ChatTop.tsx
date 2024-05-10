import styles from './top.module.css'
import {CustomChannel} from "@/components/domain/CustomChannel";
import ChannelDescription from "@/components/channel/channel/ChannelDescription";
import CustomToolBar from "@/components/chat/top/customtoolbar/CustomToolBar";

export default function ChatTop({ channel, showMembersToggle }: {
    channel: CustomChannel,
    showMembersToggle: () => void
}) {
    return (
        <div className={styles.top}>
            <ChannelDescription channel={channel}></ChannelDescription>
            <CustomToolBar showMembersToggle={showMembersToggle}/>
        </div>
    )
}

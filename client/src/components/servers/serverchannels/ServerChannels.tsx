import Channels from "@/components/channel/Channels";
import CreateChannel from "@/components/channel/createchannel/CreateChannel";
import AddChannelForm from "@/components/channel/AddChannelForm";
import {CustomServer} from "@/components/domain/CustomServer";

import styles from './serverChannels.module.css'

export default function ServerChannels({currentServer, currentChannel, servers, changeChannel}: {
    currentServer: number,
    currentChannel: number,
    servers: CustomServer[],
    changeChannel: (id: number) => void,
}) {
    return(
        <div className={styles.serverChannels}>
            <Channels servers={servers} changeChannel={changeChannel} currentChannel={currentChannel} currentServer={currentServer}/>
            {servers[currentServer] && <CreateChannel form={<AddChannelForm/>}/> }
        </div>
    )
}

import {CustomServer} from "../../domain/CustomServer";
import {Message} from "../../domain/Message";
import {User} from "../../domain/user/User";
import {CustomChannel} from "../../domain/CustomChannel";

export interface ServerRepositoryInterface {
    createServer(serverName: string, serverDescription: string, owner: User, icon?: string): Promise<CustomServer | undefined>;
    createChannel(serverId: number, channelName: string, channelDescription: string): Promise<CustomChannel | undefined>
    getServerByName(name: string): Promise<CustomServer | undefined>;
    serverExists(serverId: number): Promise<CustomServer | undefined>;
    channelExists(serverId: number, channelId: number): Promise<CustomChannel | undefined>;
    messageChannel(serverId: number, channelId: number, message: Message): Promise<Message | undefined>;
    addUserToServer(serverId: number, user: User): Promise<CustomServer | undefined>;
    leaveServer(serverId: number, userId: number): Promise<boolean>;
}

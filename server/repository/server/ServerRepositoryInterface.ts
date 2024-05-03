import {CustomServer} from "../../domain/CustomServer";
import {Message} from "../../domain/Message";
import {User} from "../../domain/user/User";
import {CustomChannel} from "../../domain/CustomChannel";

export interface ServerRepositoryInterface {
    createServer(serverName: string, serverDescription: string, user: UserProfile, icon?: string): Promise<CustomServer>;
    createChannel(serverId: number, channelName: string, channelDescription: string): Promise<CustomChannel>
    getServerByName(name: string): Promise<CustomServer>;
    serverExists(serverId: number): Promise<boolean>;
    channelExists(serverId: number, channelId: number): Promise<boolean>;
    messageChannel(serverId: number, channelId: number, message: Message): Promise<Message>;
    addUserToServer(serverId: number, user: UserProfile): Promise<CustomServer>;
    leaveServer(serverId: number, user: UserProfile): Promise<number>;
}

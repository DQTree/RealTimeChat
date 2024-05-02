import {CustomServer} from "../../domain/CustomServer";
import {CustomChannel} from "../../domain/CustomChannel";
import {Message} from "../../domain/Message";
import {User} from "../../domain/User";

export interface ServerRepositoryInterface {
    addServer(server: CustomServer): Promise<boolean>;
    getServerByName(name: string): Promise<CustomServer | undefined>;
    getServerById(id: string): Promise<CustomServer | undefined>;
    addMessageToChannel(serverId: number, channelId: number, message: Message): Promise<boolean>;
    joinServer(serverId: number, user: User): Promise<boolean>;
    leaveServer(serverId: number, userId: number): Promise<boolean>;
}

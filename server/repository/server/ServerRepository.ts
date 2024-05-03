import {ServerRepositoryInterface} from "./ServerRepositoryInterface";
import {Message} from "../../domain/Message";
import {CustomServer} from "../../domain/CustomServer";
import {User} from "../../domain/user/User";
import {CustomChannel} from "../../domain/CustomChannel";

class ServerRepository implements ServerRepositoryInterface {

    async addUserToServer(serverId: number, user: User): Promise<CustomServer | undefined> {
        return undefined;
    }

    async channelExists(serverId: number, channelId: number): Promise<CustomChannel | undefined> {
        return undefined;
    }

    async createChannel(serverId: number, channelName: string, channelDescription: string): Promise<CustomChannel | undefined> {
        return undefined;
    }

    async createServer(serverName: string, serverDescription: string, owner: User, icon?: string): Promise<CustomServer | undefined> {
        return undefined;
    }

    async messageChannel(serverId: number, channelId: number, message: Message): Promise<Message | undefined> {
        return undefined;
    }

    async serverExists(serverId: number): Promise<CustomServer | undefined> {
        return undefined;
    }

    async getServerByName(name: string): Promise<CustomServer | undefined> {
        return undefined;
    }

    async leaveServer(serverId: number, userId: number): Promise<boolean> {
        return false;
    }

}

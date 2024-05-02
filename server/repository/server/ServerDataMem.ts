import {ServerRepositoryInterface} from "./ServerRepositoryInterface";
import {Message} from "../../domain/Message";
import {CustomServer} from "../../domain/CustomServer";
import {User} from "../../domain/User";

class ServerDataMem implements ServerRepositoryInterface {
    servers: CustomServer[] = []

    addMessageToChannel(serverId: number, channelId: number, message: Message): Promise<boolean> {
        return Promise.resolve(false);
    }

    addServer(server: CustomServer): Promise<boolean> {
        return Promise.resolve(false);
    }

    getServerById(id: string): Promise<CustomServer | undefined> {
        return Promise.resolve(undefined);
    }

    getServerByName(name: string): Promise<CustomServer | undefined> {
        return Promise.resolve(undefined);
    }

    joinServer(serverId: number, user: User): Promise<boolean> {
        return Promise.resolve(false);
    }

    leaveServer(serverId: number, userId: number): Promise<boolean> {
        return Promise.resolve(false);
    }

}

export default ServerDataMem
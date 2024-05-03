import {ServerRepositoryInterface} from "../repository/server/ServerRepositoryInterface";
import {CustomServer} from "../domain/CustomServer";
import {User} from "../domain/user/User";
import {CustomChannel} from "../domain/CustomChannel";
import {Message} from "../domain/Message";

class ServerServices {
    servers: ServerRepositoryInterface
    constructor(serverRepo: ServerRepositoryInterface) {
        this.servers = serverRepo
    }
    createServer = async (serverName: string, description: string, owner: User, icon?: string): Promise<CustomServer | undefined>  => {
        return await this.servers.createServer(serverName, description, owner, icon);
    }
    createChannel = async (serverId: number, channelName: string, channelDescription: string): Promise<CustomChannel | undefined> => {
        return await this.servers.createChannel(serverId, channelName, channelDescription);
    }
    serverExistsById = async (serverId: number): Promise<CustomServer | undefined> => {
        return await this.servers.serverExists(serverId);
    }
    serverExistsByName = async (serverName: string): Promise<CustomServer | undefined> => {
        return await this.servers.getServerByName(serverName)
    }
    channelExists = async (serverId: number, channelId: number): Promise<CustomChannel | undefined> => {
        return await this.servers.channelExists(serverId, channelId);
    }
    addUserToServer = async (serverId: number, user: User): Promise<CustomServer | undefined> => {
        return await this.servers.addUserToServer(serverId, user);
    }
    messageChannel = async (serverId: number, channelId: number, message: Message): Promise<Message | undefined> => {
        return await this.servers.messageChannel(serverId, channelId, message)
    }
}

export default ServerServices

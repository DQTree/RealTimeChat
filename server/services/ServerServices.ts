import {ServerRepositoryInterface} from "../repository/server/ServerRepositoryInterface";
import {CustomServer} from "../domain/CustomServer";
import {CustomChannel} from "../domain/CustomChannel";
import {Message} from "../domain/Message";
import {BadRequestError} from "../domain/error/Error";
import {requireOrThrow} from "../middleware/requireOrThrow";
import {UserProfile} from "../domain/user/UserProfile";

class ServerServices {
    servers: ServerRepositoryInterface
    constructor(serverRepo: ServerRepositoryInterface) {
        this.servers = serverRepo
    }
    createServer = async (serverName: string, serverDescription: string, owner: UserProfile, icon?: string): Promise<CustomServer>  => {
        const serverNameTrimmed = serverName.trim()
        const serverDescriptionTrimmed = serverDescription.trim()
        requireOrThrow(BadRequestError, !(!serverNameTrimmed || !serverDescriptionTrimmed), "Server name/description can't be an empty string.")
        return await this.servers.createServer(serverNameTrimmed, serverDescriptionTrimmed, owner, icon);
    }
    createChannel = async (serverId: number, channelName: string, channelDescription: string): Promise<CustomChannel> => {
        const serverExists = await this.servers.serverExists(serverId)
        requireOrThrow(BadRequestError, serverExists, "Server doesn't exist.")
        const channelNameTrimmed = channelName.trim()
        const channelDescriptionTrimmed = channelDescription.trim()
        requireOrThrow(BadRequestError, !(!channelNameTrimmed || !channelDescriptionTrimmed), "Server name/description can't be an empty string.")
        return await this.servers.createChannel(serverId, channelDescriptionTrimmed, channelDescriptionTrimmed);
    }
    addUserToServer = async (serverId: number, user: UserProfile): Promise<CustomServer> => {
        requireOrThrow(BadRequestError, serverId > 0, "Server ID can't be a negative number.")
        return await this.servers.addUserToServer(serverId, user);
    }
    messageChannel = async (serverId: number, channelId: number, message: Message): Promise<Message> => {
        requireOrThrow(BadRequestError, await this.servers.serverExists(serverId), "Server doesn't exist.")
        requireOrThrow(BadRequestError, await this.servers.channelExists(serverId, channelId), "Channel doesn't exist.")
        requireOrThrow(BadRequestError, message.message.trim() != '', "Message can't be an empty string.")
        return await this.servers.messageChannel(serverId, channelId, message)
    }
    leaveServer = async (serverId: number, user: UserProfile): Promise<number> => {
        return await this.servers.leaveServer(serverId, user)
    }
}

export default ServerServices

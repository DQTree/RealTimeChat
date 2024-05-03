import {ServerRepositoryInterface} from "./ServerRepositoryInterface";
import {Message} from "../../domain/Message";
import {CustomServer} from "../../domain/CustomServer";
import {User} from "../../domain/user/User";
import {CustomChannel} from "../../domain/CustomChannel";

class ServerDataMem implements ServerRepositoryInterface {
    servers: CustomServer[] = []

    async messageChannel(serverId: number, channelId: number, message: Message): Promise<Message> {
        this.servers.forEach(s => {
            if(s.id == serverId){
                s.channels.forEach(channel => {
                    if(channel.id == channelId){
                        channel.messages.push(message)
                        return message
                    }
                })
            }
        })
        return undefined
    }

    async createServer(serverName: string, serverDescription: string, owner: UserProfile, icon?: string): Promise<CustomServer> {
        const server = new CustomServer(serverName, serverDescription, owner);
        this.servers.push(server);
        return server;
    }

    async getServerById(id: number): Promise<CustomServer> {
        return this.servers.find(server => server.id == id);
    }

    async addUserToServer(serverId: number, user: UserProfile): Promise<CustomServer> {
        const server = this.servers.find(server => server.id === serverId);
        if (!server) return undefined;
        if (server.users.some(e => e.id == user.id)) return undefined;
        for (const srv of this.servers) {
            if (srv.id == serverId) {
                srv.users.push(user);
                return srv;
            }
        }
        return undefined;
    }

    async leaveServer(serverId: number, user: UserProfile): Promise<number> {
        const server = this.servers.find(server => server.id === serverId);
        if (!server) return false;
        if (!server.users.some(e => e.id == user.id)) return false;
        for (const srv of this.servers) {
            if (srv.id == serverId) {
                srv.users = srv.users.filter(user => user.id !== user.id);
                return true;
            }
        }
        return false;
    }

    async channelExists(serverId: number, channelId: number): Promise<boolean> {
        const server = this.servers.find(s => s.id === serverId);
        if (server) {
            for (const channel of server.channels) {
                if (channel.id === channelId) {
                    return channel;
                }
            }
        }
        return undefined;
    }

    async createChannel(serverId: number, channelName: string, channelDescription: string): Promise<CustomChannel> {
        for (const server of this.servers) {
            if (server.id === serverId) {
                const channel = new CustomChannel(channelName, channelDescription);
                server.channels.push(channel);
                return channel;
            }
        }
        return undefined;
    }

    async serverExists(serverId: number): Promise<boolean> {
        for (const s of this.servers) {
            if (s.id == serverId) {
                return s
            }
        }
        return undefined;
    }

}

export default ServerDataMem

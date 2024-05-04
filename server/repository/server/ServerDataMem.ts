import {ServerRepositoryInterface} from "./ServerRepositoryInterface";
import {Message} from "../../domain/Message";
import {CustomServer} from "../../domain/CustomServer";
import {User} from "../../domain/user/User";
import {CustomChannel} from "../../domain/CustomChannel";
import {BadRequestError} from "../../domain/error/Error";
import {UserProfile} from "../../domain/user/UserProfile";

class ServerDataMem implements ServerRepositoryInterface {
    servers: CustomServer[] = []

    async messageChannel(serverId: number, channelId: number, message: Message): Promise<Message> {
        for (let i = 0; i < this.servers.length; i++) {
            const server = this.servers[i];
            if (server.id == serverId) {
                for (let j = 0; j < server.channels.length; j++) {
                    const channel = server.channels[j];
                    if (channel.id == channelId) {
                        channel.messages.push(message);
                        return message;
                    }
                }
            }
        }
        throw new Error("Server or channel not found");
    }

    async createServer(serverName: string, serverDescription: string, owner: UserProfile, icon?: string): Promise<CustomServer> {
        const server = new CustomServer(serverName, serverDescription, owner);
        this.servers.push(server);
        return server;
    }

    async getServerById(id: number): Promise<CustomServer> {
        return this.servers.find(server => server.id == id)!;
    }

    async addUserToServer(serverId: number, user: UserProfile): Promise<CustomServer> {
        for (const srv of this.servers) {
            if (srv.id == serverId) {
                srv.users.push(user);
                return srv;
            }
        }
        throw new BadRequestError("Server not found");
    }

    async leaveServer(serverId: number, user: UserProfile): Promise<number> {
        for (const srv of this.servers) {
            if (srv.id == serverId) {
                srv.users = srv.users.filter(u => u.id != user.id);
                return srv.id;
            }
        }
        throw new BadRequestError("Server not found");
    }

    async channelExists(serverId: number, channelId: number): Promise<boolean> {
        const server = this.servers.find(s => s.id == serverId);
        if (server) {
            for (const channel of server.channels) {
                if (channel.id === channelId) {
                    return true;
                }
            }
            return false
        }
        return false
    }

    async createChannel(serverId: number, channelName: string, channelDescription: string): Promise<CustomChannel> {
        for (const server of this.servers) {
            if (server.id === serverId) {
                const channel = new CustomChannel(channelName, channelDescription);
                server.channels.push(channel);
                return channel;
            }
        }
        throw new BadRequestError("Server not found");
    }

    async serverExists(serverId: number): Promise<boolean> {
        for (const s of this.servers) {
            if (s.id == serverId) {
                return true
            }
        }
        return false;
    }

    async getServerByName(name: string): Promise<CustomServer> {
        for (const server of this.servers) {
            if (server.name == name) {
                return server
            }
        }
        throw new BadRequestError("Server not found");
    }

}

export default ServerDataMem

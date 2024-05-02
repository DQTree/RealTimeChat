import {ServerRepositoryInterface} from "../repository/server/ServerRepositoryInterface";
import {UserRepositoryInterface} from "../repository/user/UserRepositoryInterface";
import {CustomServer} from "../domain/CustomServer";
import {User} from "../domain/User";

class ServerServices {
    servers: ServerRepositoryInterface
    constructor(serverRepo: ServerRepositoryInterface) {
        this.servers = serverRepo
    }
    createServer = async (serverToCreate: CustomServer): Promise<CustomServer | undefined>  => {
        return Promise.resolve(undefined)
    }
    serverExists = async (serverId: string): Promise<CustomServer | undefined> => {
        return Promise.resolve(undefined)
    }
    addUserToServer = async (serverId: string, user: User): Promise<CustomServer | undefined> => {
        return Promise.resolve(undefined)
    }
}

export default ServerServices
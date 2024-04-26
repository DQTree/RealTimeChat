import {User} from "./User";
import {CustomChannel} from "./CustomChannel";
import {Message} from "./Message";

export class CustomServer {
    name: string
    owner: User[]
    channels: [CustomChannel, Message[]][]
    users: User[]
    description: string
    constructor(serverName: string, description: string, owner: User) {
        this.name = serverName
        this.owner = [owner]
        this.channels = [[new CustomChannel("general", ""), []]]
        this.users = [owner]
        this.description = description
    }
}

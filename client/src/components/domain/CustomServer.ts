import {User} from "./User";
import {CustomChannel} from "@/components/domain/CustomChannel";

export class CustomServer {
    id: number = -1
    name: string
    owner: User[]
    channels: CustomChannel[]
    users: User[]
    description: string
    constructor(serverName: string, description: string, owner: User) {
        this.name = serverName
        this.owner = [owner]
        this.channels = [new CustomChannel("general", "First channel")]
        this.users = [owner]
        this.description = description
    }
}

import {User} from "./User";
import {CustomChannel} from "@/components/domain/CustomChannel";

export class CustomServer {
    id: number = -1
    name: string
    owner: User[]
    channels: CustomChannel[]
    users: User[]
    icon: string = ""
    description: string
    constructor(serverName: string, description: string, owner: User, icon: string) {
        this.name = serverName
        this.owner = [owner]
        this.channels = [new CustomChannel("general", "First channel")]
        this.users = [owner]
        this.description = description
        if(icon) this.icon = icon
    }
}

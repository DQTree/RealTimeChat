import {Message} from "./Message";
import {User} from "./User";

export class CustomChannel {
    id: number = -1
    name: string
    description: string
    messages: Message[]
    blacklist: User[]
    whitelist: User[]
    constructor(channelName: string, description: string) {
        this.name = channelName
        this.description = description
        this.messages = []
        this.blacklist = []
        this.whitelist = []
    }
}

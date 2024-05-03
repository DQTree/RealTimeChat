import {Message} from "./Message";
import {User} from "./user/User";

let serialChannel = 0

function setAndIncrementChannelID(){
    serialChannel += 1
    return serialChannel
}

export class CustomChannel {
    id: number = setAndIncrementChannelID()
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

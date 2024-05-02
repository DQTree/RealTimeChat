
let serialUser = 0

function setAndIncrementUserID(){
    serialUser += 1
    return serialUser
}

export class User {
    id: number = setAndIncrementUserID()
    username: string
    email: string
    password: string
    constructor(username: string, email: string, password: string) {
        this.username = username
        this.email = email
        this.password = password
    }
}

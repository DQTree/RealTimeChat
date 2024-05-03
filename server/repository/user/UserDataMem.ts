import {UserRepositoryInterface} from "./UserRepositoryInterface";
import {User} from "../../domain/user/User";

class UserDataMem implements UserRepositoryInterface {
    users: User[] = []

    async createUser(username: string, password: string, email: string): Promise<number | undefined> {
        const id = this.users.length + 1;
        const user: User = {id, username, email, password};
        this.users.push(user);
        return id;
    }

    async getUserById(id: number): Promise<User | undefined> {
        return this.users.find((user) => user.id == id);
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username == username);
    }
}

export default UserDataMem;

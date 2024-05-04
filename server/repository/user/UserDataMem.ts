import {UserRepositoryInterface} from "./UserRepositoryInterface";
import {User} from "../../domain/user/User";
import {BadRequestError} from "../../domain/error/Error";
import {UserProfile} from "../../domain/user/UserProfile";

class UserDataMem implements UserRepositoryInterface {
    users: User[] = []

    async createUser(username: string, password: string, email: string): Promise<number> {
        const id = this.users.length + 1;
        const user: User = {id, username, email, password};
        this.users.push(user);
        return id;
    }

    async userExists(id: number): Promise<boolean> {
        return this.users.some(user => user.id == id);
    }

    async getUserById(id: number): Promise<User> {
        const user = this.users.find((user) => user.id == id);
        if (user) {
            return user;
        }
        throw new BadRequestError("User not found");
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = this.users.find((user) => user.username == username);
        if (user) {
            return user;
        }
        throw new BadRequestError("User not found");
    }
}

export default UserDataMem;

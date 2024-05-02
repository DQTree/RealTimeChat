import {UserRepositoryInterface} from "./UserRepositoryInterface";
import {User} from "../../domain/User";

class UserDataMem implements UserRepositoryInterface {
    public users: User[] = []

    getUserById(id: number): Promise<User | undefined> {
        return Promise.resolve(this.users.find((user) => user.id == id));
    }

    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find((user) => user.username == username));
    }
    register(username: string, email: string, password: string): Promise<number | undefined> {
        const user = new User(username, email, password);
        this.users.push(user);
        return Promise.resolve(user.id);
    }
}

export default UserDataMem;

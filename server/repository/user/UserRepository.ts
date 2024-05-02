import {UserRepositoryInterface} from "./UserRepositoryInterface";
import {User} from "../../domain/User";

class UserRepository implements UserRepositoryInterface {
    //  private pool;

    constructor() {

    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(undefined);
    }
    async getUserById(id: number): Promise<User | undefined> {
        return Promise.resolve(undefined);
    }

    async register(username: string, email: string, password: string): Promise<number | undefined> {
        return Promise.resolve(undefined);
    }
}

export default UserRepository

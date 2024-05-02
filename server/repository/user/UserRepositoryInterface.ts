import {User} from "../../domain/User";

export interface UserRepositoryInterface {
    getUserByUsername: (username: string) => Promise<User | undefined>
    getUserById: (id: number) => Promise<User | undefined>
    register: (username: string, email: string, password: string) => Promise<number | undefined>
}

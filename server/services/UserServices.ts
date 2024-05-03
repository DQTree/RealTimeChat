import {BadRequestError} from "../domain/error/Error";
import {Credentials} from "../domain/user/Credentials";
import {UserDomain} from "../configs/UserDomain";
import {UserLoginInputModel} from "../domain/user/input/UserLoginInputModel";
import {UserRegisterInputModel} from "../domain/user/input/UserRegisterInputModel";
import {UserRepositoryInterface} from "../repository/user/UserRepositoryInterface";
import UserRepository from "../repository/user/UserRepository";
import {User} from "../domain/user/User";

class UserServices {
    private repo: UserRepositoryInterface;
    private domain: UserDomain;
    constructor(repo: UserRepositoryInterface) {
        this.repo = repo;
        this.domain = new UserDomain();
    }
    async login(login: UserLoginInputModel): Promise<[string, object]> {
        const user = await this.repo.getUserByUsername(login.username)
        if(user == undefined) throw new BadRequestError("User doesnt exist")

        if(!await this.domain.verifyPassword(login.password, user.password)) throw new BadRequestError("Password doesnt match")

        const tokenPromise = await this.domain.createToken(user.id, login.username, login.password, this.domain.getExpireTime());
        const expireTime = this.domain.getExpireTime();
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: expireTime
        }
        return [tokenPromise, options];
    }
    /*
    async logout(res): Promise<boolean> {

    }
    */
    async register(register: UserRegisterInputModel): Promise<number> {
        const hashedPassword = await this.domain.hashPassword(register.password)
        const id =  await this.repo.createUser(register.username, hashedPassword, register.email)
        if(id == undefined) throw new BadRequestError("Something happened while registering")
        return id
    }
    async checkAuth(token: string): Promise<Credentials | undefined> {
        return await this.domain.validateToken(token)
    }
    async getUserById(id: number): Promise<User | undefined> {
        return await this.repo.getUserById(id)
    }
}


export default UserServices

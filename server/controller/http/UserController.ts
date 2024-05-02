import {RequestHandler} from "express";
import UserServices from "../../services/UserServices";
import {UserRegisterInputModel} from "../../domain/user/input/UserRegisterInputModel";
import {UserLoginInputModel} from "../../domain/user/input/UserLoginInputModel";

class UserController {
    private services: UserServices;
    constructor(services: UserServices) {
        this.services = services
    }
    login: RequestHandler = async (req, res, next) => {
        try {
            const loginCreds: UserLoginInputModel = req.body
            const [token, options] = await this.services.login(loginCreds)
            res.status(200).cookie('loggedInUser', token, options).json({ token: token });
        } catch (error) {
            console.log("Error on login: ", error);
            next(error);
        }
    }
    logout: RequestHandler = async (req, res, next) => {
        try {
            res.clearCookie('loggedInUser').status(200).end()
        } catch (error) {
            console.log("Error on logout: ", error);
            next(error);
        }
    }
    register: RequestHandler = async (req, res, next) => {
        try {
            const registerCreds: UserRegisterInputModel = req.body
            const userId = this.services.register(registerCreds)
            res.status(201).json({id: userId})
        } catch (error) {
            console.log("Error on register: ", error);
            next(error);
        }
    }
    checkAuth: RequestHandler = async (req, res, next) => {
        try {
            res.status(200).json()
        } catch (error) {
            console.log("Error checking authentication: ", error);
            next(error);
        }
    }
}

export default UserController;

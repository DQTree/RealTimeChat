import {RequestHandler} from "express";
import {UserLoginInputModel} from "../domain/user/input/UserLoginInputModel";
import UserServices from "../services/UserServices";
import {UserRegisterInputModel} from "../domain/user/input/UserRegisterInputModel";

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
            next(error);
        }
    }
    logout: RequestHandler = async (req, res, next) => {
        try {
            res.clearCookie('loggedInUser').status(200).end()
        } catch (error) {
            next(error);
        }
    }
    register: RequestHandler = async (req, res, next) => {
        try {
            const registerCreds: UserRegisterInputModel = req.body
            const userId = this.services.register(registerCreds)
            res.status(201).json({id: userId})
        } catch (error) {
            next(error);
        }
    }
    checkAuth: RequestHandler = async (req, res, next) => {
        try {
            res.status(200).json()
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;

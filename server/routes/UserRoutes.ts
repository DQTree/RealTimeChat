import authenticatorWithServices from "../middleware/Authenticator";
import {Router} from "express";
import {ValidateInput} from "../middleware/ValidateInput";
import {UserLoginInputModelValidation} from "../domain/user/input/UserLoginInputModel";
import {UserRegisterInputModelValidation} from "../domain/user/input/UserRegisterInputModel";
import UserServices from "../services/UserServices";
import {UserRepositoryInterface} from "../repository/user/UserRepositoryInterface";
import UserDataMem from "../repository/user/UserDataMem";
import UserController from "../controller/UserController";

const userRouter = Router()
const userRepository = new UserDataMem()
//  const userRepository = new UserRepository()
const userServices = new UserServices(userRepository)
const userController = new UserController(userServices);

userRouter.post('/login', UserLoginInputModelValidation, ValidateInput, userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', UserRegisterInputModelValidation, ValidateInput, userController.register);
userRouter.get('/auth', authenticatorWithServices(userServices), userController.checkAuth);

export {
    userRouter,
    userServices
}

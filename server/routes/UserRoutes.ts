import authenticatorWithServices from "../middleware/Authenticator";
import {Router} from "express";
import {ValidateInput} from "../middleware/ValidateInput";
import {UserLoginInputModelValidation} from "../domain/user/input/UserLoginInputModel";
import {UserRegisterInputModelValidation} from "../domain/user/input/UserRegisterInputModel";
import UserServices from "../services/UserServices";
import UserController from "../controller/http/UserController";
import {UserRepositoryInterface} from "../repository/user/UserRepositoryInterface";
import UserDataMem from "../repository/user/UserDataMem";

export const userRouter: Router  = Router()
const userRepository: UserRepositoryInterface = new UserDataMem()
//  const userRepository: UserRepositoryInterface = new UserRepository()
export const userServices: UserServices = new UserServices(userRepository)
const userController: UserController = new UserController(userServices);

userRouter.post('/login', UserLoginInputModelValidation, ValidateInput, userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', UserRegisterInputModelValidation, ValidateInput, userController.register);
userRouter.get('/auth', authenticatorWithServices(userServices), userController.checkAuth);


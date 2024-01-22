import { Request, Response } from "express";
import { jwtGenerate } from "../middlewares/auth.middleware";
import * as bcrypt from "bcrypt";
import HttpException from "../utils/httpException.util";
import UserModel from "../models/user.model";
import { User } from "@prisma/client";

const saltRounds = 10;

class AuthController {
    getAllUsers = async (req: Request, res: Response) => {
        // #swagger.tags = ['Authentication']
        // #swagger.summary = 'Get all users "FOR ADMIN ROLE ONLY"'
        // #swagger.description = 'Get all users from the database'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.parameters['take'] = {
                in: 'query',
                description: 'limit data rows [default:3]',
                type: 'number'
        } */
        /*  #swagger.parameters['skip'] = {
                in: 'query',
                description: 'skip data rows [default:0]',
                type: 'number'
        } */
        const users = await UserModel.findAll(req.query);
        res.status(200).send({
            type: "success",
            status: 200,
            message: "Get all users",
            length: users.length,
            data: users,
        });
    };

    getProfile = async (req: Request, res: Response) => {
        // #swagger.tags = ['Authentication']
        // #swagger.summary = 'Get user profile'
        // #swagger.description = 'Get user profile, require Token for authentication'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const user = req.user;
        res.status(200).send({
            type: "success",
            status: 200,
            message: "Get user profile",
            data: user,
        });
    };

    signUp = async (req: Request, res: Response) => {
        // #swagger.tags = ['Authentication']
        // #swagger.summary = 'User SignUp'
        // #swagger.description = 'SignUp user with email, password and name'
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        "example": {
                            email: "test@example.com",
                            password: "testtest",
                            name: "test",
                        }
                    }
                }
            } 
        */
        try {
            const userObject = req.body;

            const hash = await this.hashPassword(userObject.password, saltRounds);
            userObject.password = hash;

            const created = await UserModel.create(userObject);
            if (!created) {
                throw new HttpException(400, "Signup User failed");
            }

            res.status(201).send({
                type: "success",
                status: 201,
                message: "Sign Up successfully",
            });
        } catch (error: any) {
            throw error;
        }
    };

    signIn = async (req: Request, res: Response) => {
        // #swagger.tags = ['Authentication']
        // #swagger.summary = 'User SignIn'
        // #swagger.description = 'SignIn user with email and password'
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "example": {
                        email: "test@example.com",
                        password: "testtest",
                        }
                    }
                }
            } 
        */
        try {
            const userObject: User = req.body;
            const user = await UserModel.findOne({ email: userObject.email });
            if (!user) {
                throw new HttpException(404, "User not found");
            }
            const passwordMatch = bcrypt.compareSync(userObject.password, user.password);
            if (!passwordMatch) {
                throw new HttpException(401, "Incorrect password");
            }

            const { password, ...result } = user;

            res.status(200).send({
                type: "success",
                status: 200,
                message: "Sign in successfully",
                data: {
                    access_token: jwtGenerate(result),
                },
            });
        } catch (error) {
            throw error;
        }
    };

    findUser = async (id: number) => {
        const user = await UserModel.findOne({ id: id });
        if (!user) {
            return null;
        }

        const { password, ...result } = user;

        return result;
    };

    validatePassword = async (password: string, hashPassword: string) => {
        return bcrypt.compareSync(password, hashPassword);
    };

    hashPassword = async (password: string, saltRounds: number) => {
        return bcrypt.hashSync(password, saltRounds);
    };
}

export default new AuthController();

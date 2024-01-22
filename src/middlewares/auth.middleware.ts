import * as passportJwt from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as dotenv from "dotenv";
import HttpException from "../utils/httpException.util";
import AuthController from "../controllers/auth.controller";
import { User } from "@prisma/client";
dotenv.config();

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const secretKey: any = process.env.SECRET_KEY || "";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        console.log(payload);
        const user = await AuthController.findUser(payload.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
});

export const passportConfig = (passport: any) => {
    passport.use(jwtAuth);
};

export const jwtGenerate = (user: any) => {
    const expiredTime = "60m";
    const accessToken = jwt.sign({ email: user.email, id: user.id }, secretKey, { expiresIn: expiredTime, algorithm: "HS256" });

    return accessToken;
};

export const auth = (role: string = "User") => {
    return (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, (error: any, user: User, info: any, status: any) => {
            if (error) {
                return next(error);
            }

            if (info) {
                if (!req.headers["authorization"]?.replace("Bearer ", "")) {
                    throw new HttpException(400, "Token is required");
                }
                return next(info);
            }

            if (!user || !user.is_active) {
                throw new HttpException(401, "Unauthorized");
            }
            if (role == "Admin" && user.role !== role) {
                throw new HttpException(401, "Unauthorized access role");
            }

            const { password, ...userWithOutPwd } = user;
            req.user = userWithOutPwd;

            next();
        })(req, res, next);
    };
};

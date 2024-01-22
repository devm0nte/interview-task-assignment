import { body } from "express-validator";
export const createUserValidator = [
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().notEmpty(),
];

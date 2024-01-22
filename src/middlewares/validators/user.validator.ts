import { body } from "express-validator";
export const createUserValidator = [
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().notEmpty(),
    body("role").optional().isIn(["User", "Admin"]).withMessage("role must be one of Admin/User"),
];

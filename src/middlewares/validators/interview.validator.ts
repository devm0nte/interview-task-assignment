import { body, query, param } from "express-validator";

export const createInterviewValidator = [
    body("subject").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("status").isIn(["Todo", "InProgress", "Done"]).optional(),
];

export const updateInterviewValidator = [
    param("id").isInt().toInt(),
    body("subject").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("status").notEmpty().isIn(["Todo", "InProgress", "Done"]).withMessage("status must be one of Todo/InProgress/Done"),
];

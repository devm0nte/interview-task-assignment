import { body, query, param } from "express-validator";

export const createInterviewValidator = [body("subject").isString().notEmpty(), body("description").isString().notEmpty()];

export const updateInterviewValidator = [
    param("id").isInt().toInt(),
    body("subject").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("status").isString().notEmpty(),
];

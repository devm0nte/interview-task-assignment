import { body, query, param } from "express-validator";
export const createCommentValidator = [body("interview_id").isInt().notEmpty(), body("message").isString().notEmpty()];

export const updateCommentValidator = [param("id").isInt().toInt(), body("message").isString().notEmpty()];

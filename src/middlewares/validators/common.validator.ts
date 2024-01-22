import { body, query, param } from "express-validator";
export const queryParamValidator = [
    query("skip").optional().isInt().toInt(),
    query("take").optional().isInt().toInt(),
    query("cursor").optional().isInt().toInt(),
    query("orderBy").optional().isString(),
];

export const paramIdValidator = [param("id").isInt().toInt()];

export const paramIdInterviewValidator = [param("interview_id").isInt().toInt()];

import { Request, Response } from "express";
import HttpException from "../utils/httpException.util";
import { getUserIdUtil } from "../utils/getUserId.util";
import CommentModel from "../models/comment.model";

class CommentController {
    getAllComment = async (req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Get all comments "FOR ADMIN ROLE ONLY"'
        // #swagger.description = 'Get all comments from database'
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
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const comments = await CommentModel.findAll(req.query);
        res.status(200).send({
            type: "success",
            status: 200,
            message: "Get all comments",
            length: comments.length,
            data: comments,
        });
    };

    getAllCommentByInterviewId = async (req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Get all comments by interview Id'
        // #swagger.description = 'Get all comments by interview Id from database'
        /*  #swagger.parameters['interview_id'] = {
                description: 'Interview ID',
                type: 'number',
                example: 1,
        } */
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
        const interviewId: number = +req.params.interview_id;
        const where: any = { interview_id: interviewId };
        const comments = await CommentModel.findAll({ ...req.query, where });
        res.status(200).send({
            type: "success",
            status: 200,
            message: "Get all comments",
            length: comments.length,
            data: comments,
        });
    };

    getByCommentId = async (req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Get an comments by ID'
        // #swagger.description = 'Get all comments from database'
        /*  #swagger.parameters['id'] = {
                description: 'Comment ID',
                type: 'number',
                example: 1,
        } */
        const commentId: number = +req.params.id;
        const comment = await CommentModel.findOne({ id: commentId });

        if (!comment) throw new HttpException(404, "Comment not found");

        res.status(200).send({
            type: "success",
            status: 200,
            message: "Get comment details",
            data: comment,
        });
    };

    createComment = async (req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Create a new comment'
        // #swagger.description = 'Create a new comment in the interview'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "example": {
                        interview_id: 1,
                        message: "test message",
                        }
                    }
                }
            } 
        */
        try {
            const userId = getUserIdUtil(req.user);
            const commentObject = req.body;
            commentObject.author_id = userId;
            const created = await CommentModel.create(commentObject);
            if (!created) {
                throw new HttpException(400, "Create Comment failed");
            }

            res.status(201).send({
                type: "success",
                status: 201,
                message: "Create Comment successfully",
            });
        } catch (error: any) {
            throw error;
        }
    };

    updateComment = async (req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Update a comment by ID'
        // #swagger.description = 'Update a comment'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.parameters['id'] = {
                description: 'Comment ID',
                type: 'number',
                example: 1,
        } */
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "example": {
                        message: "test message2",
                        }
                    }
                }
            } 
        */
        try {
            const userId = getUserIdUtil(req.user);
            const commentId: number = +req.params.id;
            const updated = await CommentModel.update({
                where: {
                    id: commentId,
                    author_id: userId,
                },
                data: {
                    message: req.body.message,
                    updated_at: new Date(),
                },
            });
            if (!updated) {
                throw new HttpException(400, "Update Comment failed");
            }

            res.status(200).send({
                type: "success",
                status: 200,
                message: "Update Comment successfully",
            });
        } catch (error: any) {
            throw error;
        }
    };

    removeComment = async (req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Delete a comment by ID'
        // #swagger.description = 'Delete a Comment (SOFT DELETE by insert deleted_at to field)'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.parameters['id'] = {
                description: 'Comment ID',
                type: 'number',
                example: 1,
        } */
        try {
            const userId: number = getUserIdUtil(req.user);
            const commentId: number = +req.params.id;

            // SOFT DELETE
            const deleted = await CommentModel.update({
                where: {
                    id: commentId,
                    author_id: userId,
                },
                data: {
                    deleted_at: new Date(),
                },
            });
            if (!deleted) {
                throw new HttpException(400, "Remove Comment failed");
            }

            res.status(200).send({
                type: "success",
                status: 200,
                message: "Remove Comment successfully",
            });
        } catch (error: any) {
            throw error;
        }
    };
}

export default new CommentController();

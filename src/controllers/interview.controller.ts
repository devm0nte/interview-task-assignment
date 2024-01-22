import { Request, Response } from "express";
import HttpException from "../utils/httpException.util";
import InterviewModel from "../models/interview.model";
import InterviewChangeLogModel from "../models/interviewChangeLog.model";
import { Interview, Interview_change_log } from "@prisma/client";
import { getUserIdUtil } from "../utils/getUserId.util";

class InterviewController {
    getAllInterview = async (req: Request, res: Response) => {
        // #swagger.tags = ['Interviews']
        // #swagger.summary = 'Get all interviews'
        // #swagger.description = 'Get all interviews from the database'
        const interviews = await InterviewModel.findAll(req.query);
        res.status(200).send({
            type: "success",
            status: 200,
            message: "Get all interviews",
            length: interviews.length,
            data: interviews,
        });
    };

    getByInterviewId = async (req: Request, res: Response) => {
        // #swagger.tags = ['Interviews']
        // #swagger.summary = 'Get interviews details by ID'
        // #swagger.description = 'Get an interviews details'
        /*  #swagger.parameters['id'] = {
                description: 'Interview ID',
                type: 'number',
                example: 1,
        } */
        const interviewId: number = +req.params.id;
        const interview = await InterviewModel.findOne({ id: interviewId });

        if (!interview) throw new HttpException(404, "Interview not found");

        res.status(200).send({
            type: "success",
            status: 200,
            message: "Get interview details",
            data: interview,
        });
    };

    createInterview = async (req: Request, res: Response) => {
        // #swagger.tags = ['Interviews']
        // #swagger.summary = 'Create interview'
        // #swagger.description = 'Create an interview task'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "example": {
                        subject: "test topic",
                        description: "test description",
                        status: "Todo",
                        }
                    }
                }
            } 
        */
        try {
            const userId = getUserIdUtil(req.user);
            const interviewObject = req.body;
            interviewObject.author_id = userId;
            const created = await InterviewModel.create(interviewObject);
            if (!created) {
                throw new HttpException(400, "Create Interview failed");
            }

            await this.createInterviewChangeLog(created, userId);
            res.status(201).send({
                type: "success",
                status: 201,
                message: "Create Interview successfully",
            });
        } catch (error: any) {
            throw error;
        }
    };

    updateInterview = async (req: Request, res: Response) => {
        // #swagger.tags = ['Interviews']
        // #swagger.summary = 'Update interview'
        // #swagger.description = 'Update an interview details'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.parameters['id'] = {
                description: 'Interview ID',
                type: 'number',
                example: 1,
        } */
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    "example": {
                        subject: "test topic2",
                        description: "test description2",
                        status: "Todo",
                        }
                    }
                }
            } 
        */

        try {
            const userId = getUserIdUtil(req.user);
            const interviewId: number = +req.params.id;
            const updated = await InterviewModel.update({
                where: {
                    id: interviewId,
                },
                data: {
                    subject: req.body.subject,
                    description: req.body.description,
                    status: req.body.status,
                    updated_at: new Date(),
                },
            });
            if (!updated) {
                throw new HttpException(400, "Update Interview failed");
            }

            await this.createInterviewChangeLog(updated, userId);
            res.status(200).send({
                type: "success",
                status: 200,
                message: "Update Interview successfully",
            });
        } catch (error: any) {
            throw error;
        }
    };

    archiveInterview = async (req: Request, res: Response) => {
        // #swagger.tags = ['Interviews']
        // #swagger.summary = 'Archive an interview'
        // #swagger.description = 'Archive an interview task (like soft delete from database)'
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.parameters['id'] = {
                description: 'Interview ID',
                type: 'number',
                example: 1,
        } */
        try {
            const userId: number = getUserIdUtil(req.user);
            const interviewId: number = +req.params.id;

            // SOFT DELETE With Archive field updated
            const updated = await InterviewModel.update({
                where: {
                    id: interviewId,
                },
                data: {
                    archived_at: new Date(),
                },
            });
            if (!updated) {
                throw new HttpException(400, "Archive Interview failed");
            }
            await this.createInterviewChangeLog(updated, userId);
            res.status(200).send({
                type: "success",
                status: 200,
                message: "Archive Interview successfully",
            });
        } catch (error: any) {
            throw error;
        }
    };

    createInterviewChangeLog = async (interview: Interview, editor_id: number) => {
        try {
            const logObject: any = {
                interview_id: interview.id,
                subject: interview.subject,
                description: interview.description,
                status: interview.status,
                editor_id: editor_id,
                updated_at: new Date(),
                archived_at: interview.archived_at,
            };
            await InterviewChangeLogModel.create(logObject);
        } catch (error) {
            throw error;
        }
    };
}

export default new InterviewController();

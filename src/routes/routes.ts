import express from "express";
import AuthRouter from "./auth.route";
import InterviewRouter from "./interview.route";
import CommentRouter from "./comment.route";
import { awaitHandlerFactory } from "../middlewares/awaitHandler.middleware";

export const routes = express.Router();

// routes.use("/api/auth", awaitHandlerFactory(AuthRouter));
// routes.use("/api/interviews", awaitHandlerFactory(InterviewRouter));
// routes.use("/api/comments", awaitHandlerFactory(CommentRouter));

routes.use("/api/auth", AuthRouter);
routes.use("/api/interviews", InterviewRouter);
routes.use("/api/comments", CommentRouter);

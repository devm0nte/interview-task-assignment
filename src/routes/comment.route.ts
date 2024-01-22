import { Router } from "express";
import { awaitHandlerFactory } from "../middlewares/awaitHandler.middleware";
import { validatorHandler } from "../middlewares/validator.middleware";
import { auth } from "../middlewares/auth.middleware";
import { paramIdInterviewValidator, paramIdValidator, queryParamValidator } from "../middlewares/validators/common.validator";
import CommentController from "../controllers/comment.controller";
import { createCommentValidator, updateCommentValidator } from "../middlewares/validators/comment.validator";

const router = Router();

// router.get("/", auth("Admin"), queryParamValidator, validatorHandler(), CommentController.getAllComment);

// router.get(
//     "/interview/:interview_id",
//     queryParamValidator,
//     paramIdInterviewValidator,
//     validatorHandler(),
//     CommentController.getAllCommentByInterviewId,
// );

// router.post("/", auth(), createCommentValidator, validatorHandler(), CommentController.createComment);

// router.put("/:id", auth(), updateCommentValidator, validatorHandler(), CommentController.updateComment);

// router.delete("/:id", auth(), paramIdValidator, validatorHandler(), CommentController.removeComment);

router.get("/", auth("Admin"), queryParamValidator, validatorHandler(), awaitHandlerFactory(CommentController.getAllComment));

router.get(
    "/interview/:interview_id",
    queryParamValidator,
    paramIdInterviewValidator,
    validatorHandler(),
    awaitHandlerFactory(CommentController.getAllCommentByInterviewId),
);

router.post("/", auth(), createCommentValidator, validatorHandler(), awaitHandlerFactory(CommentController.createComment));

router.put("/:id", auth(), updateCommentValidator, validatorHandler(), awaitHandlerFactory(CommentController.updateComment));

router.delete("/:id", auth(), paramIdValidator, validatorHandler(), awaitHandlerFactory(CommentController.removeComment));

export default router;

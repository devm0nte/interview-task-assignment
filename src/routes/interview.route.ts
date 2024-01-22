import { Router } from "express";
import { awaitHandlerFactory } from "../middlewares/awaitHandler.middleware";
import { validatorHandler } from "../middlewares/validator.middleware";
import InterviewController from "../controllers/interview.controller";
import { createInterviewValidator, updateInterviewValidator } from "../middlewares/validators/interview.validator";
import { auth } from "../middlewares/auth.middleware";
import { paramIdValidator, queryParamValidator } from "../middlewares/validators/common.validator";

const router = Router();

router.get("/", queryParamValidator, validatorHandler(), awaitHandlerFactory(InterviewController.getAllInterview));

router.get("/:id", paramIdValidator, validatorHandler(), awaitHandlerFactory(InterviewController.getByInterviewId));

router.post("/", auth(), createInterviewValidator, validatorHandler(), awaitHandlerFactory(InterviewController.createInterview));

router.put(
    "/:id",
    auth(),
    updateInterviewValidator,
    validatorHandler(),
    awaitHandlerFactory(InterviewController.updateInterview),
);

router.put(
    "/archive/:id",
    auth(),
    paramIdValidator,
    validatorHandler(),
    awaitHandlerFactory(InterviewController.archiveInterview),
);

export default router;

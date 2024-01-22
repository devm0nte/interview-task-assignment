import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import passport from "passport";
import { awaitHandlerFactory } from "../middlewares/awaitHandler.middleware";
import { validatorHandler } from "../middlewares/validator.middleware";
import { createUserValidator } from "../middlewares/validators/user.validator";
import { auth } from "../middlewares/auth.middleware";
import { queryParamValidator } from "../middlewares/validators/common.validator";

const router = Router();

router.post("/signin", awaitHandlerFactory(AuthController.signIn));
router.post("/signup", createUserValidator, validatorHandler(), awaitHandlerFactory(AuthController.signUp));
router.get("/users", queryParamValidator, validatorHandler(), auth("Admin"), awaitHandlerFactory(AuthController.getAllUsers));
router.get("/profile", auth(), awaitHandlerFactory(AuthController.getProfile));
export default router;

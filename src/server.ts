import express, { NextFunction, Request, Response } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cors from "cors";
import ratelimitMiddleware from "./middlewares/ratelimit";
import passport from "passport";
import { passportConfig } from "./middlewares/auth.middleware";
import * as dotenv from "dotenv";
dotenv.config();
// ROUTER
import { routes } from "./routes/routes";
import bodyParser from "body-parser";
import swaggerOutput from "./swagger_output.json";
import errorMiddleware from "./middlewares/error.middleware";
import HttpException from "./utils/httpException.util";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use(ratelimitMiddleware);
passportConfig(passport);
app.use(passport.initialize());

const apiVersion = "/v1/";
const port: number = 3000;

app.get(`/`, (req, res) => {
    res.send({
        message: "API Version" + apiVersion,
        swaggerDoc: `http://localhost:${port}/api-doc`,
    });
});

app.use(`${apiVersion}`, routes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new HttpException(404, "Endpoint Not Found");
    next(err);
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log("listening on port", port);
});
export default app;

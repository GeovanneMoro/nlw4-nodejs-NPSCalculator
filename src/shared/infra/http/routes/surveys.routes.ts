import { Router } from "express";

import { CreateSurveyController } from "../../../../modules/surveys/useCases/createSurvey/CreateSurveyController";
import { ShowSurveysController } from "../../../../modules/surveys/useCases/showSurveys/ShowSurveysController";

const surveysRouter = Router();

const createSurveyController = new CreateSurveyController();
const showSurveysController = new ShowSurveysController();

surveysRouter.post("/", createSurveyController.handle);
surveysRouter.get("/", showSurveysController.handle);

export { surveysRouter };

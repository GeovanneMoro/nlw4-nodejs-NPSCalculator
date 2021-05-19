import { Router } from "express";

import { AnswerMailController } from "../../../../modules/surveysUsers/useCase/answerMail/AnswerMailController";
import { CreateSurveyUserController } from "../../../../modules/surveysUsers/useCase/createSurveyUser/CreateSurveyUserController";
import { ListSurveyUserController } from "../../../../modules/surveysUsers/useCase/ListSurveyUser/ListSurveyUserController";
import { NPSCalculatorController } from "../../../../modules/surveysUsers/useCase/NPSCalculator/NPSCalculatorController";

const surveysUsersRouter = Router();

const createSurveyUserController = new CreateSurveyUserController();
const listSurveysUsersController = new ListSurveyUserController();
const answerMailController = new AnswerMailController();
const npsCalculatorController = new NPSCalculatorController();

surveysUsersRouter.post("/send-email", createSurveyUserController.handle);
surveysUsersRouter.get("/list", listSurveysUsersController.handle);
surveysUsersRouter.get("/answers/:value", answerMailController.handle);
surveysUsersRouter.get("/nps/:survey_id", npsCalculatorController.handle);

export { surveysUsersRouter };

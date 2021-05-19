import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSurveyUserUseCase } from "./CreateSurveyUserUseCase";

class CreateSurveyUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body;

    const createSurveyUserUseCase = container.resolve(CreateSurveyUserUseCase);

    const surveyUser = await createSurveyUserUseCase.execute({
      email,
      survey_id,
    });

    return response.status(201).json(surveyUser);
  }
}

export { CreateSurveyUserController };

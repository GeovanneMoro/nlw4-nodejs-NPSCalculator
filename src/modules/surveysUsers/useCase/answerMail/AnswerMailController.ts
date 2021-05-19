import { Request, Response } from "express";
import { container } from "tsyringe";

import { AnswerMailUseCase } from "./AnswerMalUseCase";

class AnswerMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { value } = request.params;
    const { u } = request.query;

    const answerMailUseCase = container.resolve(AnswerMailUseCase);
    const surveyUser = await answerMailUseCase.execute({
      value: Number(value),
      id: String(u),
    });

    return response.json(surveyUser);
  }
}

export { AnswerMailController };

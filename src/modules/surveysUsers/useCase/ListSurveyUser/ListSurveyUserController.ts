import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSurveyUserUseCase } from "./ListSurveyUserUseCase";

class ListSurveyUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSurveyUserUseCase = container.resolve(ListSurveyUserUseCase);

    const all = await listSurveyUserUseCase.execute();

    return response.json(all);
  }
}

export { ListSurveyUserController };

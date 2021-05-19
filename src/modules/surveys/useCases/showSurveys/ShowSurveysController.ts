import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowSurveysUseCase } from "./ShowSurveysUseCase";

class ShowSurveysController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showSurveysUseCase = container.resolve(ShowSurveysUseCase);

    const surveys = await showSurveysUseCase.execute();

    return response.json(surveys);
  }
}

export { ShowSurveysController };

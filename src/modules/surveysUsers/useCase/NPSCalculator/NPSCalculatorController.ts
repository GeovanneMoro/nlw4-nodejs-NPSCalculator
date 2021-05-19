import { Request, Response } from "express";
import { container } from "tsyringe";

import { NPSCalculatorUseCase } from "./NPSCalculatorUseCase";

class NPSCalculatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { survey_id } = request.params;

    const npsCalculatorUseCase = container.resolve(NPSCalculatorUseCase);

    const responseNps = await npsCalculatorUseCase.execute(survey_id);

    return response.json(responseNps);
  }
}

export { NPSCalculatorController };

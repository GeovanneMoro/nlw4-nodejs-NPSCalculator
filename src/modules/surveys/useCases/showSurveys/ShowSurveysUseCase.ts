import { inject, injectable } from "tsyringe";

import { Survey } from "../../infra/typeorm/entities/Survey";
import { ISurveysRepository } from "../../repositories/ISurveysRepository";

@injectable()
class ShowSurveysUseCase {
  constructor(
    @inject("SurveysRepository") private surveysRepository: ISurveysRepository
  ) {}

  async execute(): Promise<Survey[]> {
    const surveys = await this.surveysRepository.listAll();

    return surveys;
  }
}

export { ShowSurveysUseCase };

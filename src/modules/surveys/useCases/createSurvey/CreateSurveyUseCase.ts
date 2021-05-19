import { inject, injectable } from "tsyringe";

import { ICreateSurveyDTO } from "../../dtos/ICreateSurveyDTO";
import { Survey } from "../../infra/typeorm/entities/Survey";
import { ISurveysRepository } from "../../repositories/ISurveysRepository";

@injectable()
class CreateSurveyUseCase {
  constructor(
    @inject("SurveysRepository") private surveysRepository: ISurveysRepository
  ) {}

  async execute({ title, description }: ICreateSurveyDTO): Promise<Survey> {
    const survey = await this.surveysRepository.create({ title, description });

    return survey;
  }
}

export { CreateSurveyUseCase };

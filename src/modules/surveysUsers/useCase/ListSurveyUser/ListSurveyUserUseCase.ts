import { inject, injectable } from "tsyringe";

import { SurveyUser } from "../../infra/typeorm/entities/SurveyUser";
import { ISurveysUsersRepository } from "../../repositories/ISurveysUsersRepository";

@injectable()
class ListSurveyUserUseCase {
  constructor(
    @inject("SurveysUsersRepository")
    private surveysUsersRepository: ISurveysUsersRepository
  ) {}

  async execute(): Promise<SurveyUser[]> {
    const all = await this.surveysUsersRepository.listAll();

    return all;
  }
}

export { ListSurveyUserUseCase };

import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { SurveyUser } from "../../infra/typeorm/entities/SurveyUser";
import { ISurveysUsersRepository } from "../../repositories/ISurveysUsersRepository";

interface IRequest {
  value: number;
  id: string;
}

@injectable()
class AnswerMailUseCase {
  constructor(
    @inject("SurveysUsersRepository")
    private surveysUsersRepository: ISurveysUsersRepository
  ) {}
  async execute({ value, id }: IRequest): Promise<SurveyUser> {
    const surveyUser = await this.surveysUsersRepository.findSurveyUserById(id);

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
    }

    surveyUser.value = value;

    console.log(surveyUser);

    await this.surveysUsersRepository.update(surveyUser);

    return surveyUser;
  }
}

export { AnswerMailUseCase };

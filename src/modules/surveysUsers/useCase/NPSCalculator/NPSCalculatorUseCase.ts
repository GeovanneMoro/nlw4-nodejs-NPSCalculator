import { inject, injectable } from "tsyringe";

import { ISurveysUsersRepository } from "../../repositories/ISurveysUsersRepository";

interface INpsCalculator {
  detractors: number;
  passives: number;
  promoters: number;
  totalAnswers: number;
  nps: number;
}

@injectable()
class NPSCalculatorUseCase {
  constructor(
    @inject("SurveysUsersRepository")
    private surveysUsersRepository: ISurveysUsersRepository
  ) {}

  async execute(id: string): Promise<INpsCalculator> {
    const surveysUsers = await this.surveysUsersRepository.findSurveysUsersById(
      id
    );

    const detractors = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 0 && surveyUser.value <= 6
    ).length;

    const passives = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 7 && surveyUser.value <= 8
    ).length;

    const promoters = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 9 && surveyUser.value <= 10
    ).length;

    const totalAnswers = surveysUsers.length;

    const nps = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    return { detractors, passives, promoters, totalAnswers, nps };
  }
}

export { NPSCalculatorUseCase };

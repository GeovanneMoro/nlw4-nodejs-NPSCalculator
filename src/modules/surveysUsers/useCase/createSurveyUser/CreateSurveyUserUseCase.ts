import path from "path";
import { inject, injectable } from "tsyringe";

import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ISurveysRepository } from "../../../surveys/repositories/ISurveysRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { SurveyUser } from "../../infra/typeorm/entities/SurveyUser";
import { ISurveysUsersRepository } from "../../repositories/ISurveysUsersRepository";

interface IRequest {
  email: string;
  survey_id: string;
}

@injectable()
class CreateSurveyUserUseCase {
  constructor(
    @inject("SurveysUsersRepository")
    private surveysUsersRepository: ISurveysUsersRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("SurveysRepository")
    private surveysRepository: ISurveysRepository,
    @inject("EtherealMailProvider") private mailProvider: IMailProvider
  ) {}

  async execute({ email, survey_id }: IRequest): Promise<SurveyUser> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const survey = await this.surveysRepository.findById(survey_id);

    if (!survey) {
      throw new AppError("Survey does not exists");
    }

    const surveyUser = await this.surveysUsersRepository.findSurveyUserByUser(
      user.id
    );

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    const npsPath = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "npsMail.hbs"
    );

    if (surveyUser) {
      variables.id = surveyUser.id;

      this.mailProvider.sendMail({
        to: email,
        subject: survey.title,
        variables,
        path: npsPath,
      });

      return surveyUser;
    }

    const surveyUserNew = await this.surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    variables.id = surveyUserNew.id;

    await this.mailProvider.sendMail({
      to: email,
      subject: survey.title,
      variables,
      path: npsPath,
    });

    return surveyUserNew;
  }
}

export { CreateSurveyUserUseCase };

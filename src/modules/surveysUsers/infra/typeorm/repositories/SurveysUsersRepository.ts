import {
  EntityRepository,
  getRepository,
  Repository,
  Not,
  IsNull,
} from "typeorm";

import { ICreateSurveyUserDTO } from "../../../dtos/ICreateSurveyUserDTO";
import { ISurveysUsersRepository } from "../../../repositories/ISurveysUsersRepository";
import { SurveyUser } from "../entities/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsersRepository implements ISurveysUsersRepository {
  private repository: Repository<SurveyUser>;

  constructor() {
    this.repository = getRepository(SurveyUser);
  }

  async update(data: SurveyUser): Promise<void> {
    await this.repository.save(data);
  }

  async create({
    user_id,
    survey_id,
  }: ICreateSurveyUserDTO): Promise<SurveyUser> {
    const surveyUser = this.repository.create({
      user_id,
      survey_id,
    });

    const surveyUser2 = await this.repository.save(surveyUser);

    return surveyUser2;
  }

  async listAll(): Promise<SurveyUser[]> {
    const surveysUsers = await this.repository.find();

    return surveysUsers;
  }

  async findSurveyUserByUser(userId: string): Promise<SurveyUser> {
    const surveyUser = await this.repository.findOne({
      where: { user_id: userId, value: null },
      relations: ["user", "survey"],
    });

    return surveyUser;
  }

  async findSurveysUsersById(id: string): Promise<SurveyUser[]> {
    const surveysUsers = await this.repository.find({
      survey_id: id,
      value: Not(IsNull()),
    });

    return surveysUsers;
  }

  async findSurveyUserById(id: string): Promise<SurveyUser> {
    const surveyUser = await this.repository.findOne(id);

    return surveyUser;
  }
}

export { SurveysUsersRepository };

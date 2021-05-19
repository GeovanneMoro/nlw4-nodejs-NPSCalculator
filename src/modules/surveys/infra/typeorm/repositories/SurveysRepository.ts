import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateSurveyDTO } from "../../../dtos/ICreateSurveyDTO";
import { ISurveysRepository } from "../../../repositories/ISurveysRepository";
import { Survey } from "../entities/Survey";

@EntityRepository(Survey)
class SurveysRepository implements ISurveysRepository {
  private repository: Repository<Survey>;

  constructor() {
    this.repository = getRepository(Survey);
  }

  async listAll(): Promise<Survey[]> {
    const surveys = await this.repository.find();

    return surveys;
  }

  async findById(id: string): Promise<Survey> {
    const survey = await this.repository.findOne(id);

    return survey;
  }

  async create({ title, description }: ICreateSurveyDTO): Promise<Survey> {
    const survey = this.repository.create({ title, description });
    await this.repository.save(survey);

    return survey;
  }
}

export { SurveysRepository };

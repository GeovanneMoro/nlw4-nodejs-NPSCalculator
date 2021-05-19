import { ICreateSurveyDTO } from "../dtos/ICreateSurveyDTO";
import { Survey } from "../infra/typeorm/entities/Survey";

interface ISurveysRepository {
  listAll(): Promise<Survey[]>;
  findById(id: string): Promise<Survey>;
  create({ title, description }: ICreateSurveyDTO): Promise<Survey>;
}

export { ISurveysRepository };

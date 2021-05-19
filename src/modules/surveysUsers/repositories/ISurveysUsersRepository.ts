import { ICreateSurveyUserDTO } from "../dtos/ICreateSurveyUserDTO";
import { SurveyUser } from "../infra/typeorm/entities/SurveyUser";

interface ISurveysUsersRepository {
  update(data: SurveyUser): Promise<void>;
  create(data: ICreateSurveyUserDTO): Promise<SurveyUser>;
  listAll(): Promise<SurveyUser[]>;
  findSurveyUserByUser(userId: string): Promise<SurveyUser>;
  findSurveysUsersById(id: string): Promise<SurveyUser[]>;
  findSurveyUserById(id: string): Promise<SurveyUser>;
}

export { ISurveysUsersRepository };

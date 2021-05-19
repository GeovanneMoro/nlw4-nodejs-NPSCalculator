import { container } from "tsyringe";

import "./providers";

import { SurveysRepository } from "../../modules/surveys/infra/typeorm/repositories/SurveysRepository";
import { ISurveysRepository } from "../../modules/surveys/repositories/ISurveysRepository";
import { SurveysUsersRepository } from "../../modules/surveysUsers/infra/typeorm/repositories/SurveysUsersRepository";
import { ISurveysUsersRepository } from "../../modules/surveysUsers/repositories/ISurveysUsersRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ISurveysRepository>(
  "SurveysRepository",
  SurveysRepository
);

container.registerSingleton<ISurveysUsersRepository>(
  "SurveysUsersRepository",
  SurveysUsersRepository
);

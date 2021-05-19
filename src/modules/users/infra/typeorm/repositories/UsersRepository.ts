import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({ name, email }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ name, email });

    await this.repository.save(user);
  }
}

export { UsersRepository };

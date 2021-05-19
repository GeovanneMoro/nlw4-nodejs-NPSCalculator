import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    console.log(name);
    console.log(typeof name);

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError("Validation Failed!", 400);
    }

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, email });

    return response.status(201).send();
  }
}

export { CreateUserController };

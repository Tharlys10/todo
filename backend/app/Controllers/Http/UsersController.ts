import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ICreateUserDTO } from 'App/DTOs/ICreateUserDTO';
import { IUserResponseDTO } from 'App/DTOs/IUserResponseDTO';

import { CreateUserUseCase } from 'App/useCase/User/createUser/CreateUserUseCase';
import { FindUserByIdUseCase } from 'App/useCase/User/findUserById/findUserByIdUseCase';

export default class UsersController {
  public async index({ request }: HttpContextContract): Promise<IUserResponseDTO> {
    const { id } = request.params();

    const findUserByIdUseCase = new FindUserByIdUseCase();

    const user = await findUserByIdUseCase.execute(id);

    return user;
  }

  public async create({ request }: HttpContextContract): Promise<IUserResponseDTO> {
    const { name, username, password } = request.only(["name", "username", "password"]) as ICreateUserDTO;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({ name, username, password });

    return user
  }
}

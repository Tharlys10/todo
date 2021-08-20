import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationUserUseCase } from 'App/UseCase/User/authenticationUser/AuthenticationUserUseCase';
import { IUserResponseDTO } from '../../DTOs/IUserResponseDTO';


interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: IUserResponseDTO;
  token: string;
}

export default class SessionsController {
  public async create({ request }: HttpContextContract): Promise<IResponse> {
    const { username, password } = request.only(["username", "password"]) as IRequest;

    const authenticationUserUseCase = new AuthenticationUserUseCase();

    const session = await authenticationUserUseCase.execute({ username, password });

    return session
  }
}

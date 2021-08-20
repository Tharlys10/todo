import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { UsersRepository } from "App/Repositories/Users/implementations/UsersRepository";
import { UserMap } from "App/Mapper/UserMap";
import { IUserResponseDTO } from "App/DTOs/IUserResponseDTO";


interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: IUserResponseDTO;
  token: string;
}

class AuthenticationUserUseCase {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.repository.findByUsername(username);

    if (!user) {
      throw new Error("User or password incorrect");
    }

    const password_match = await compare(password, user.password)

    if (!password_match) {
      throw new Error("User or password incorrect");
    }

    const token = sign({}, process.env.SECRET_TOKEN as string, {
      subject: user.id,
      expiresIn: '5h'
    });

    const user_response: IResponse = {
      user: UserMap.toDTO(user),
      token
    }

    return user_response;
  }
}

export { AuthenticationUserUseCase }
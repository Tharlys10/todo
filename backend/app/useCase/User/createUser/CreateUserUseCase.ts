import { hash } from "bcrypt";

import { ICreateUserDTO } from "App/DTOs/ICreateUserDTO";
import { UsersRepository } from "App/Repositories/Users/implementations/UsersRepository";
import { IUserResponseDTO } from "App/DTOs/IUserResponseDTO";
import { UserMap } from "App/Mapper/UserMap";


class CreateUserUseCase {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  public async execute({ name, username, password }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const user_already_exists = await this.repository.findByUsername(username);

    if (user_already_exists) {
      throw new Error("User already exists");
    }

    const password_hash = await hash(password, 8)

    const user = await this.repository.create({ name, username, password: password_hash })

    return UserMap.toDTO(user);
  }
}

export { CreateUserUseCase }
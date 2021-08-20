import { IUserResponseDTO } from "App/DTOs/IUserResponseDTO";
import { UserMap } from "App/Mapper/UserMap";
import { UsersRepository } from "App/Repositories/Users/implementations/UsersRepository";


class FindUserByIdUseCase {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  public async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return UserMap.toDTO(user);
  }
}

export { FindUserByIdUseCase }
import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "App/DTOs/IUserResponseDTO";
import User from "App/Models/User";

class UserMap {
  static toDTO({ id, name, username, created_at, updated_at }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      username,
      created_at: new Date(created_at.toString()),
      updated_at: new Date(updated_at.toString())
    })

    return user;
  }
}


export { UserMap }
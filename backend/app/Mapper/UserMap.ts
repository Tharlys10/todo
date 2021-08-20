import { classToClass } from "class-transformer";

import { IUserResponseDTO } from "App/DTOs/IUserResponseDTO";
import User from "App/Models/User";

class UserMap {
  static toDTO({ id, name, username, createdAt, updatedAt }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      username,
      createdAt: new Date(createdAt.toString()),
      updatedAt: new Date(updatedAt.toString())
    })

    return user;
  }
}


export { UserMap }
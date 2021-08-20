import { ICreateUserDTO } from "App/DTOs/ICreateUserDTO";
import { IUpdateUserDTO } from "App/DTOs/IUpdateUserDTO";
import User from "App/Models/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {
  async find(): Promise<User[]> {
    const users = await User.all()

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await User.find(id);

    return user
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await User.findBy('username', username);

    return user;
  }

  async create({ name, username, password }: ICreateUserDTO): Promise<User> {
    const user = await User.create({
      name,
      username,
      password
    })

    return user;
  }

  async update({ id, name, username }: IUpdateUserDTO): Promise<User> {
    const user = await User.create({
      id,
      name,
      username
    })

    return user;
  }
}

export { UsersRepository }
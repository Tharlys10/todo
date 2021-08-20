import { ICreateUserDTO } from "App/DTOs/ICreateUserDTO";
import { IUpdateUserDTO } from "App/DTOs/IUpdateUserDTO";
import User from "App/Models/User";


interface IUsersRepository {
  find(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository }
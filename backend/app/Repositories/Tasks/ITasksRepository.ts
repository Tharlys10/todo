import { ICreateTaskDTO } from "App/DTOs/ICreateTaskDTO";
import Task from "App/Models/Task";


interface ITasksRepository {
  find(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  findByIdUser(user_id: string): Promise<Task[]>;
  create(data: ICreateTaskDTO): Promise<Task>;
  updateStatus(id: string, status: boolean): Promise<Task>;
  delete(id: string): Promise<void>;
}

export { ITasksRepository }
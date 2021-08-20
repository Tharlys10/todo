import { ICreateTaskDTO } from "App/DTOs/ICreateTaskDTO";
import Task from "App/Models/Task";
import { ITasksRepository } from "../ITasksRepository";


class TasksRepository implements ITasksRepository {
  async find(): Promise<Task[]> {
    const tasks = await Task.all();

    return tasks;
  }

  async findByIdUser(user_id: string): Promise<Task[]> {
    const tasks = await Task.query().where({ user_id })

    return tasks;
  }

  async create({ user_id, title, description }: ICreateTaskDTO): Promise<Task> {
    const task = await Task.create({
      user_id,
      title,
      description
    })

    return task;
  }

  async updateStatus(id: string, status: boolean): Promise<Task> {
    const task = await Task.create({
      id,
      finished: status
    })

    return task;
  }

}

export { TasksRepository }
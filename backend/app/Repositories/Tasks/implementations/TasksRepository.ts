import { ICreateTaskDTO } from "App/DTOs/ICreateTaskDTO";
import Task from "App/Models/Task";
import { ITasksRepository } from "../ITasksRepository";


class TasksRepository implements ITasksRepository {
  async find(): Promise<Task[]> {
    const tasks = await Task.all();

    return tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const task = await Task.find(id);

    return task;
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
    const task = await Task.findOrFail(id)

    task.finished = status;

    await task.save()

    return task;
  }

  async delete(id: string): Promise<void> {
    const task = await Task.findOrFail(id);

    await task.delete()
  }
}

export { TasksRepository }
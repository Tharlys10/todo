import Task from "App/Models/Task";
import { TasksRepository } from "App/Repositories/Tasks/implementations/TasksRepository";


class UpdateStatusUseCase {
  private repository: TasksRepository;

  constructor() {
    this.repository = new TasksRepository();
  }

  public async execute(id: string, status: boolean): Promise<Task> {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    const task_update = await this.repository.updateStatus(id, status);

    return task_update;
  }
}

export { UpdateStatusUseCase }
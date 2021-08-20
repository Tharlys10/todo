import { TasksRepository } from "App/Repositories/Tasks/implementations/TasksRepository"


class DeleteTaskUseCase {
  private repository: TasksRepository;

  constructor() {
    this.repository = new TasksRepository();
  }

  public async execute(id: string): Promise<void> {
    const task = await this.repository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    await this.repository.delete(id)
  }
}

export { DeleteTaskUseCase }
import { TasksRepository } from "App/Repositories/Tasks/implementations/TasksRepository";
import Task from "App/Models/Task"
import { ICreateTaskDTO } from "App/DTOs/ICreateTaskDTO";
import { UsersRepository } from "App/Repositories/Users/implementations/UsersRepository";

class CreateTaskUseCase {
  private repository: TasksRepository;
  private usersRepository: UsersRepository;

  constructor() {
    this.repository = new TasksRepository();
    this.usersRepository = new UsersRepository();
  }

  public async execute({ user_id, title, description }: ICreateTaskDTO): Promise<Task> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const task = await this.repository.create({ user_id, title, description });

    return task;
  }
}

export { CreateTaskUseCase }
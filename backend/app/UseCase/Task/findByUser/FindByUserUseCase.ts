import Task from "App/Models/Task";
import { TasksRepository } from "App/Repositories/Tasks/implementations/TasksRepository"
import { UsersRepository } from "App/Repositories/Users/implementations/UsersRepository";


class FindByUserUseCase {
  private repository: TasksRepository;
  private usersRepository: UsersRepository;

  constructor() {
    this.repository = new TasksRepository();
    this.usersRepository = new UsersRepository();
  }

  public async execute(user_id: string): Promise<Task[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const tasks = await this.repository.findByIdUser(user.id);

    return tasks;
  }
}

export { FindByUserUseCase }
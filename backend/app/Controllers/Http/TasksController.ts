import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ICreateTaskDTO } from 'App/DTOs/ICreateTaskDTO';
import Task from 'App/Models/Task';
import { CreateTaskUseCase } from 'App/UseCase/Task/createTask/CreateTaskUseCase';
import { DeleteTaskUseCase } from 'App/UseCase/Task/deleteTask/DeleteTaskUseCase';
import { FindByUserUseCase } from 'App/UseCase/Task/findByUser/FindByUserUseCase';
import { UpdateStatusUseCase } from 'App/UseCase/Task/updateStatus/UpdateStatusUseCase';

export default class TasksController {
  public async findByUser({ request }: HttpContextContract): Promise<Task[]> {
    const { id } = request.params();

    const findByUserUseCase = new FindByUserUseCase();

    const tasks = await findByUserUseCase.execute(id);

    return tasks;
  }

  public async create({ request }: HttpContextContract): Promise<Task> {
    const { user_id, title, description } = request.only(["user_id", "title", "description"]) as ICreateTaskDTO;

    const createTaskUseCase = new CreateTaskUseCase();

    const task = await createTaskUseCase.execute({ user_id, title, description });

    return task;
  }

  public async updateStatus({ request }: HttpContextContract): Promise<Task> {
    const { id } = request.params();
    const { status } = request.only(["status"]) as { status: boolean };

    const updateStatusUseCase = new UpdateStatusUseCase();

    const task = await updateStatusUseCase.execute(id, status);

    return task;
  }

  public async delete({ request }: HttpContextContract): Promise<void> {
    const { id } = request.params();

    const deleteTaskUseCase = new DeleteTaskUseCase();

    await deleteTaskUseCase.execute(id);
  }
}

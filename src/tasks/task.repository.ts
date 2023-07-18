import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository, ObjectId } from 'typeorm';
import { Task } from './task.entity';
import { TaskInterface } from 'src/repositories/taskRepository.interface';
import { getTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task.enum';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class TaskRepository
  extends MongoRepository<Task>
  implements TaskInterface
{
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async getTasks(filterDto: getTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    try {
      const tasks = Task.find({
        where: { status: status },
      });
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async getMyTasks(userId: ObjectId): Promise<Task[]> {
    const tasks = await Task.find({ where: { userId: userId } });
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    task.userId = user.id;
    await task.save();

    return task;
  }
}

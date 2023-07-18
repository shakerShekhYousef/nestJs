import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { TaskRepository } from './task.repository';
import { getTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: getTaskFilterDto, user: User) {
    return await this.taskRepository.getTasks(filterDto,user);
  }
  async getMyTasks(userId: ObjectId) {
    return await this.taskRepository.getMyTasks(userId);
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  async getTaskById(id: string): Promise<Task> {
    return await this.taskRepository.findOneByOrFail({
      _id: new ObjectId(id),
    });
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    task.save();
    return task;
  }
}

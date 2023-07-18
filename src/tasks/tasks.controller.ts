import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  UseGuards,
  ValidationPipe,
  Query,
  UsePipes,
  Logger
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task.enum';
import { getTaskFilterDto } from './dto/get-task-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    private logger = new Logger('TasksController'),
    private tasksService: TasksService
    ) {}

  @Get()
  getAllTasks(@Query() filterDto: getTaskFilterDto, @GetUser() user: User) {
    return this.tasksService.getTasks(filterDto, user);
  }
  @Get('my_tasks')
  getMyTasks(@GetUser() user: User) {
    return this.tasksService.getMyTasks(user.id);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, status);
  }
}

import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';

export interface TaskInterface extends Repository<Task> {
}

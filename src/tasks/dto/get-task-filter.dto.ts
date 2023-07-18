import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.enum';

export class getTaskFilterDto {
  @IsOptional()
  search: string;

  @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN])
  @IsOptional()
  status: TaskStatus;
}

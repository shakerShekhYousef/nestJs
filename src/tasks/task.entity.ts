import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { TaskStatus } from './task.enum';
import { User } from 'src/auth/user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

  @ObjectIdColumn()
  userId : ObjectId;
}

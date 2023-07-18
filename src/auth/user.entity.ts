import {
  BaseEntity,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/task.entity';

@Entity({ name: 'users' })
@Unique(['username'])
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

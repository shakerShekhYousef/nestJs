import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrm } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TasksModule, AuthModule, TypeOrmModule.forRoot(typeOrm)],
})
export class AppModule {}

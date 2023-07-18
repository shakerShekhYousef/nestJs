import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { UserInterface } from 'src/repositories/userRepository.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UserRepository
  extends MongoRepository<User>
  implements UserInterface
{
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOneBy({username});
    if(user && await user.validatePassword(password)){
      return user.username;
    }else{
      return null;
    }
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}

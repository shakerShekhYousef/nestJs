import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private JwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    } else {
      const payload: jwtPayload = { username };
      const accessToken = await this.JwtService.sign(payload);
      return { accessToken };
    }
  }
}

import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";

export interface UserInterface extends Repository<User>{
    signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>;
}
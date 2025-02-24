import { Body, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    /**inject auth service */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return {
        message: 'user not found',
        error: true,
      };
    }
    return user;
  }

  public async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('from the service', createUserDto);
    console.log(createUserDto.settings); //{"city":"Paris"}
    //check if user exists
    const userExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (userExists) {
      return {
        message: 'user already exists',
        error: true,
      };
    }
    // create user
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
    // if not created throw an error
  }
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { PatchUserDto } from '../dtos/patchUser.dto';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { DeleteGoogleUserProvider } from './delete-google-user.provider';
import { GetGoogleUserProvider } from './get-google-user.provider';
import { UpdateGoogleUserProvider } from './update-google-user.provider';

@Injectable()
export class UsersService {
  constructor(
    // /**inject profile config */
    // @Inject(profileConfig.KEY)
    // private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    /**inject auth service */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    /**inject create user provider */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
    /**inject get user provider */
    private readonly GetGoogleUserProvider: GetGoogleUserProvider,
    /**inject update user provider */
    private readonly updateGoogleUserProvider: UpdateGoogleUserProvider,
    /**inject delete user provider */
    private readonly deleteGoogleUserProvider: DeleteGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createGoogleUserProvider.createUser(createUserDto);
  }
  public async findUserByGoogleId(googleId: string): Promise<User> {
    return this.GetGoogleUserProvider.findUserByGoogleId(googleId);
  }
  public async findUserById(id: number): Promise<User> {
    return this.GetGoogleUserProvider.findUserById(id);
  }

  public async udpateUser(
    patchUserDto: PatchUserDto,
    userData: ActiveUserData,
  ) {
    return this.updateGoogleUserProvider.udpateUser(patchUserDto, userData);
  }

  public async delete(user: ActiveUserData) {
    return this.deleteGoogleUserProvider.delete(user);
  }
}

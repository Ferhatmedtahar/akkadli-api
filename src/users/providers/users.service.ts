import {
  BadRequestException,
  Body,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth/auth.service';
import { defaultAddress } from 'src/settings/addresses/constants/defaultAddress.const';
import { defaultGeneralSettings } from 'src/settings/general-settings/constants/defaultGeneralSettings.const';
import { Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateUserDto } from '../dtos/createUser.dto';
import { PatchUserDto } from '../dtos/patchUser.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    /**inject profile config */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    /**inject auth service */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    /**inject config service */
    private readonly configService: ConfigService,
  ) {}

  public async findUserById(id: number) {
    // console.log(this.configService.get<string>('STORAGE')); work using the .env at start
    // console.log(this.configService.get<string>('NODE_ENV'));
    // console.log(this.configService.get<string>('STORAGE'));
    // console.log(this.profileConfiguration.apiKey);
    let user = undefined;
    try {
      user = await this.userRepository.findOne({
        where: { id },
        relations: {
          deliveries: true,
          products: true,
          orders: true,
          address: true,
        },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!user) {
      throw new BadRequestException('user Id does not exist');
    }
    return user;
  }

  public async createUser(@Body() createUserDto: CreateUserDto) {
    let userExists = undefined;
    //check if user exists
    try {
      userExists = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      //can save the details later on a log file
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (userExists) {
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );
    }
    //alter the dto if there are no address or general settings we use the default ones
    if (!createUserDto.address) {
      createUserDto.address = defaultAddress;
    }

    if (!createUserDto.generalSettings) {
      createUserDto.generalSettings = defaultGeneralSettings;
    }

    // create user
    let newUser = this.userRepository.create(createUserDto);

    // if not created throw an error
    try {
      newUser = await this.userRepository.save(newUser);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
  }

  public async delete(id: number) {
    throw new HttpException(
      {
        status: HttpStatus.METHOD_NOT_ALLOWED,
        error: 'can not delete a user',
      },
      HttpStatus.METHOD_NOT_ALLOWED,
      {
        description: 'the Api endpoint still under development',
      },
    );
    let deletedUser = undefined;
    //delete the post , no need to delete seperatly the settings first because cascade
    try {
      deletedUser = await this.userRepository.delete(id);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    return { deleted: true, id };
  }

  public async udpateUser(@Body() patchUserDto: PatchUserDto, id: number) {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({ where: { id } });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!user) {
      throw new NotFoundException(`user not found, please sign up`, {
        description: 'error finding the user',
      });
    }

    user.firstName = patchUserDto.firstName;
    user.lastName = patchUserDto.lastName;

    try {
      await this.userRepository.save(user);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    return user;
  }
}

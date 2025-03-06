import {
  BadRequestException,
  Body,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import jwtConfig from 'src/auth/config/jwt.config';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { AuthService } from 'src/auth/providers/auth.service';
import { defaultAddress } from 'src/settings/addresses/constants/defaultAddress.const';
import { defaultGeneralSettings } from 'src/settings/general-settings/constants/defaultGeneralSettings.const';
import { Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateUserDto } from '../dtos/createUser.dto';
import { GetUserParamsDto } from '../dtos/getUserParams.dto';
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
    /**inject jwtService */
    private readonly jwtService: JwtService,
    /**inject jwt config  */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async findUserById(id: number): Promise<User> {
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

    return await this.jwtService.signAsync(
      {
        sub: newUser.id,
        email: newUser.email,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.tokenAudience,
        issuer: this.jwtConfiguration.tokenIssuer,
        expiresIn: this.jwtConfiguration.accessTokenTTL,
      },
    );
  }

  public async delete(@Param() getUserParamsDto: GetUserParamsDto) {
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
      deletedUser = await this.userRepository.delete(getUserParamsDto.id);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    return { deleted: true, id: getUserParamsDto.id };
  }

  public async udpateUser(
    @Body() patchUserDto: PatchUserDto,
    @Param() getUserParamsDto: GetUserParamsDto,
  ) {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({
        where: { id: getUserParamsDto.id },
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

import {
  BadRequestException,
  Body,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { defaultAddress } from 'src/settings/addresses/constants/defaultAddress.const';
import { defaultGeneralSettings } from 'src/settings/general-settings/constants/defaultGeneralSettings.const';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../user.entity';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async createUser(@Body() createUserDto: CreateUserDto) {
    let userExists = undefined;
    //check if user exists
    try {
      userExists = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      //can save the details later on a log file
      console.log(error);
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
    } catch (e) {
      console.log(e);
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    return newUser;
  }
}

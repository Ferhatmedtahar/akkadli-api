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
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { GetUserParamsDto } from '../dtos/getUserParams.dto';
import { PatchUserDto } from '../dtos/patchUser.dto';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { DeleteGoogleUserProvider } from './delete-google-user.provider';

@Injectable()
export class UpdateGoogleUserProvider {
  constructor(
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
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

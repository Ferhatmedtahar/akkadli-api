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
export class GetGoogleUserProvider {
  constructor(
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async findUserByGoogleId(googleId: string): Promise<User> {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({ where: { googleId } });
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

  public async findUserById(id: number): Promise<User> {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({
        where: { id },
        relations: {
          // deliveries: true,
          // products: true,
          // orders: true,
          address: true,
          generalSettings: true,
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
}

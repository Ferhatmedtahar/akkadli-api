import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Repository } from 'typeorm';
import { PatchUserDto } from '../dtos/patchUser.dto';
import { User } from '../user.entity';

@Injectable()
export class UpdateGoogleUserProvider {
  constructor(
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async udpateUser(
    patchUserDto: PatchUserDto,
    userData: ActiveUserData,
  ) {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({
        where: { id: userData.sub },
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

    user.firstName = patchUserDto.firstName ?? user.firstName;
    user.lastName = patchUserDto.lastName ?? user.lastName;

    try {
      user = await this.userRepository.save(user);
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

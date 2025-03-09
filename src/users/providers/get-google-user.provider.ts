import {
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class GetGoogleUserProvider {
  constructor(
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async findUserByGoogleId(googleId: string): Promise<User> {
    let user = undefined;
    try {
      user = await this.userRepository.findOne({ where: { googleId } });
    } catch (error) {
      this.logger.error(
        'Failed to find user: Database error',
        error.stack || error.message || 'No stack trace available',
      );
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
    } catch (error) {
      this.logger.error(
        'Failed to find user: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    if (!user) {
      this.logger.warn(`User not found for ID ${id} `);
      throw new NotFoundException('user Id does not exist');
    }

    this.logger.log(`User found for ID ${id}`);
    return user;
  }
}

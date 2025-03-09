import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/logger/interfaces/logger.interface';
import { MailService } from 'src/mail/providers/mail.service';
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
    /**inject mail service */
    private readonly mailService: MailService,
    /**inject logger service */
    @Inject('ILogger') private readonly logger: ILogger,
  ) {}
  public async createUser(createUserDto: CreateUserDto) {
    let userExists = undefined;
    //check if user exists
    try {
      userExists = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
    } catch (error) {
      this.logger.error(
        'Failed to find user: Database error',
        error.stack || error.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }

    if (userExists) {
      this.logger.error(
        'Failed to create user: User already exists',
        userExists.stack || userExists.message || 'No stack trace available',
      );
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
      this.logger.error(
        'Failed to create user: Database error',
        e.stack || e.message || 'No stack trace available',
      );
      throw new InternalServerErrorException(
        'Unable to process the request at the moment, please try later',
        {
          description: 'error connecting to the database',
          // cause: error,
        },
      );
    }
    try {
      await this.mailService.sendUserWelcomeEmail(newUser);
    } catch (error) {
      this.logger.error('Failed to send email', error.stack || error.message);
      throw new InternalServerErrorException('Email Could not be sent', {
        description: 'could not send email',
        cause: error,
      });
    }

    return newUser;
  }
}

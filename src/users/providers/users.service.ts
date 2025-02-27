import { Body, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth/auth.service';
import { defaultAddress } from 'src/settings/addresses/constants/defaultAddress.const';
import { defaultGeneralSettings } from 'src/settings/general-settings/constants/defaultGeneralSettings.const';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { PatchUserDto } from '../dtos/patchUser.dto';
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
    return await this.userRepository.findOne({
      where: { id },
      relations: { deliveries: true },
    });
  }

  public async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('from the body', createUserDto);

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
    //alter the dto if there are no address or general settings we use the default ones
    if (!createUserDto.address) {
      createUserDto.address = defaultAddress;
    }

    if (!createUserDto.generalSettings) {
      createUserDto.generalSettings = defaultGeneralSettings;
    }

    // create user
    const user = this.userRepository.create(createUserDto);

    console.log(user);
    // if not created throw an error
    return await this.userRepository.save(user);
  }

  public async delete(id: number) {
    console.log(id);
    //delete the post , no need to delete seperatly the settings first because cascade
    await this.userRepository.delete(id);
    return { deleted: true, id };
  }

  public async udpateUser(@Body() patchUserDto: PatchUserDto, id: number) {
    console.log(patchUserDto);
    const updates = {
      firstName: patchUserDto.firstName,
      lastName: patchUserDto.lastName,
    };
    const updated = await this.userRepository.update(id, updates);
    return updated;
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserParamsDto } from '../dtos/getUserParams.dto';
import { User } from '../user.entity';

@Injectable()
export class DeleteGoogleUserProvider {
  constructor(
    /**inject user repository */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
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
}

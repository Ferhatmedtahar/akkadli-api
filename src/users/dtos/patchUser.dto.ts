import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {}

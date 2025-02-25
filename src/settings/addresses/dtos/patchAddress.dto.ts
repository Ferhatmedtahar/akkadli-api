import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './createAddress.dto';

export class PatchAddressDto extends PartialType(CreateAddressDto) {}

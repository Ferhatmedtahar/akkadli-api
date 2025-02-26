import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryDto } from './createDeliveries.dto';

export class PatchDeliveryDto extends PartialType(CreateDeliveryDto) {}

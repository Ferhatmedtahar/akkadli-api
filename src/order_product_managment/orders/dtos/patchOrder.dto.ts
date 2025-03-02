import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './createOrder.dto';

export class PatchOrderDto extends PartialType(CreateOrderDto) {}

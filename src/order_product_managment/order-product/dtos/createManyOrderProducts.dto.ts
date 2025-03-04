import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderProviderDto } from './createOrderProductProvider.dto';

export class CreateManyOrderProductsDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProviderDto)
  orderProducts: CreateOrderProviderDto[];
}

import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetUserParamsDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}

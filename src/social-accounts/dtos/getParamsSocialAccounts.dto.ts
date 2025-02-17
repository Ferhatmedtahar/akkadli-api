import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class GetSocialAccountsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId: number;
}

import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number = 10;
}

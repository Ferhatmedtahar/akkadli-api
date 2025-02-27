import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetGeneralSettingsParamDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    title: 'id',
    description: 'id of the general settings',
    example: 1,
    required: true,
    type: 'number',
  })
  @Type(() => Number)
  id: number;
}

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  apiId: string;
  @IsString()
  @IsNotEmpty()
  apiToken: string;
  //temporary solution
  @IsInt()
  @IsNotEmpty()
  userId: number;
}

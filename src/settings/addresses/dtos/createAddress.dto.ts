import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  municipality: string;
  @IsInt()
  @IsNotEmpty()
  postalCode: number;
  @IsString()
  @IsNotEmpty()
  wilaya: string;
}

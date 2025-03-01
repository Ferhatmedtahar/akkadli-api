import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './createProduct.dto';

export class PatchProductDto extends PartialType(CreateProductDto) {}

import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/paginationQuery.dto';

class GetOrdersBaseDto {}

export class GetOrdersDto extends IntersectionType(
  GetOrdersBaseDto,
  PaginationQueryDto,
) {}

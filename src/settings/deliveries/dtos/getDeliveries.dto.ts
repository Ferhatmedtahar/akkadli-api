import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/paginationQuery.dto';

class GetDeliveriesBaseDto {}

export class GetDeliveriesDto extends IntersectionType(
  GetDeliveriesBaseDto,
  PaginationQueryDto,
) {}

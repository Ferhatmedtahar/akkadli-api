import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from './dtos/paginationQuery.dto';

@Injectable()
export class PaginationService {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    where?: any,
    relations?: any,
  ) {
    let results = undefined;
    results = await repository.find({
      where,
      relations,
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    return results;
  }
}

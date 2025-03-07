import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from './dtos/paginationQuery.dto';
import { Paginated } from './interfaces/paginated.interface';
@Injectable()
export class PaginationService {
  constructor(
    /*
    injecting request object 
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    where?: any,
    relations?: any,
  ) {
    const { limit, page } = paginationQuery;
    let results = undefined;
    results = await repository.find({
      where,
      relations,
      skip: (page - 1) * limit,
      take: limit,
    });

    /**
     * create request urls , we need access to the request object
    http://localhost:3000/
    */

    const baseUrl = `${this.request.protocol}://${this.request.headers.host}`;
    const newUrl = new URL(this.request.url, baseUrl);

    /** now we need to calculate the metadata */
    const totalItems = await repository.count({ where });
    const itemsPerPage = limit;
    const currentPage = page;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const first = `${baseUrl}${newUrl.pathname}?limit=${limit}&page=1`;
    const prevous = `${baseUrl}${newUrl.pathname}?limit=${limit}&page=${page === 1 ? 1 : page - 1}`;
    const current = `${baseUrl}${newUrl.pathname}?limit=${limit}&page=${page}`;
    const next = `${baseUrl}${newUrl.pathname}?limit=${limit}&page=${totalPages === page ? page : page + 1}`;
    const last = `${baseUrl}${newUrl.pathname}?limit=${limit}&page=${totalPages}`;

    const finalResponse: Paginated<T> = {
      data: results,
      metaData: {
        totalItems,
        itemsPerPage,
        currentPage,
        totalPages,
      },
      links: {
        first,
        prevous,
        current,
        next,
        last,
      },
    };
    return finalResponse;
  }
}

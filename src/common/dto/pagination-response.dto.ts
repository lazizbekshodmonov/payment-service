import { PaginationRequestQueryDto } from './pagination-request-queryDto';

export class PaginationResponseDto<Dto, Query extends PaginationRequestQueryDto> {
  data: Dto[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  query: Query;

  constructor(data: Dto[], total: number, query: Query) {
    this.data = data;
    this.page = query.page;
    this.size = query.size;
    this.totalElements = total;
    this.totalPages = Math.ceil(total / query.size);
    this.query = query;
  }
}

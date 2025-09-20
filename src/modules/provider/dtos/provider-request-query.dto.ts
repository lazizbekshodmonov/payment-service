import { PaginationRequestQueryDto } from '../../../common/dto/pagination-request-queryDto';
import { IsOptional, IsString } from 'class-validator';

export class ProviderRequestQueryDto extends PaginationRequestQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}

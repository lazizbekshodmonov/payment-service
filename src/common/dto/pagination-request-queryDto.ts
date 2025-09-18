import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationRequestQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(200)
  size: number = 20;
}

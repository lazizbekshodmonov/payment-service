import { PaginationRequestQueryDto } from '../../../common/dto/pagination-request-queryDto';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../user.enum';
import { Transform } from 'class-transformer';

export class UserRequestQueryDto extends PaginationRequestQueryDto {
  @IsOptional()
  @IsBoolean()
  // @Transform(({ value }: { value: string }) => {
  //   if (value === 'true') return true;
  //   if (value === 'false') return false;
  //   return value;
  // })
  active?: boolean;

  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  @IsOptional()
  @IsString()
  search?: string;
}

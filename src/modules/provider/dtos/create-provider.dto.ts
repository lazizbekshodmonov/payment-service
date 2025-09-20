import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ProviderType } from '../provider.enum';

export class CreateProviderDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  logoHashId?: string;

  @IsEnum(ProviderType)
  providerType: ProviderType;
}

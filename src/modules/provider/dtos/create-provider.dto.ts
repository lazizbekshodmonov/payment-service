import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaymentProvider } from '../provider.enum';

export class CreateProviderDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  logoHashId?: string;

  @IsEnum(PaymentProvider)
  providerType: PaymentProvider;

  @IsBoolean()
  @IsOptional()
  hasTestMode?: boolean;

  @IsOptional()
  config?: any;
}

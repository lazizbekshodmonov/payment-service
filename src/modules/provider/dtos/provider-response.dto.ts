import { FileResponseDto } from '../../file/dto/file.dto';
import { ProviderType } from '../provider.enum';
import { ProviderEntity } from '../entities/provider.entity';

export class ProviderResponseDto {
  id: number;
  name: string;
  logo: FileResponseDto | null;
  providerType: ProviderType;
  constructor(entity: ProviderEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.providerType = entity.providerType;
    this.logo = entity.logo ? new FileResponseDto(entity.logo) : null;
  }
}

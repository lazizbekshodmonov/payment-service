import { CreateProviderDto } from './dtos/create-provider.dto';
import { ProviderEntity } from './entities/provider.entity';
import { FileEntity } from '../file/entities/file.entity';
import { UpdateProviderDto } from './dtos/update-provider.dto';

export class ProviderMapper {
  static fromCreateDto(dto: CreateProviderDto, logo?: FileEntity): ProviderEntity {
    const provider = new ProviderEntity();
    provider.name = dto.name;
    provider.providerType = dto.providerType;
    provider.logo = logo ?? null;
    provider.config = dto.config;
    return provider;
  }
  static fromUpdateDto(entity: ProviderEntity, dto: UpdateProviderDto, logo?: FileEntity): ProviderEntity {
    const provider = new ProviderEntity();
    provider.name = dto.name ?? entity.name;
    provider.providerType = dto.providerType ?? entity?.providerType;
    provider.logo = logo ?? entity.logo;
    provider.config = dto.config ?? entity.logo;
    return provider;
  }
}

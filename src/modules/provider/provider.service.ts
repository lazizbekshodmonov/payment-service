import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderEntity } from './entities/provider.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { UpdateProviderDto } from './dtos/update-provider.dto';
import { ProviderMapper } from './provider.mapper';
import { FileEntity } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { ProviderResponseDto } from './dtos/provider-response.dto';
import { ProviderRepository } from './repositories/provider.repository';

@Injectable()
export class ProviderService {
  constructor(
    private readonly providerRepository: ProviderRepository,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateProviderDto) {
    const existingProvider = await this.providerRepository.findOne({ where: { providerType: dto.providerType } });

    if (existingProvider) throw new BadRequestException('Provider already exist');

    let logo: FileEntity | undefined;

    if (dto.logoHashId) {
      logo = await this.fileService.findByHashId(dto.logoHashId);
    }

    const entity = ProviderMapper.fromCreateDto(dto, logo);

    await this.providerRepository.save(entity);
  }

  async findAll() {
    const result = await this.providerRepository.find({
      relations: ['logo'],
      order: { id: 'ASC' },
    });

    return result.map((item) => new ProviderResponseDto(item));
  }

  async findOne(id: number) {
    const provider = await this.providerRepository.findOne({
      where: { id },
      relations: ['logo'],
    });

    if (!provider) throw new NotFoundException(`Provider with id=${id} not found`);
    return new ProviderResponseDto(provider);
  }

  async update(id: number, dto: UpdateProviderDto) {
    const provider = await this.providerRepository.findOne({ where: { id } });

    if (!provider) throw new NotFoundException(`Provider with id=${id} not found`);
    let logo: FileEntity | undefined;

    if (dto.logoHashId && dto.logoHashId !== provider.logo?.hashId) {
      logo = await this.fileService.findByHashId(dto.logoHashId);
    }

    const entity = ProviderMapper.fromUpdateDto(provider, dto, logo);

    await this.providerRepository.update({ id }, entity);
  }

  async delete(id: number): Promise<void> {
    const provider = await this.providerRepository.findOne({ where: { id } });

    if (!provider) throw new NotFoundException(`Provider with id=${id} not found`);

    await this.providerRepository.softDelete({ id });
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderEntity } from './entities/provider.entity';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { UpdateProviderDto } from './dtos/update-provider.dto';
import { ProviderMapper } from './provider.mapper';
import { FileEntity } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
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

  async findAll(): Promise<ProviderEntity[]> {
    return this.providerRepository.find({
      relations: ['logo'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ProviderEntity> {
    const provider = await this.providerRepository.findOne({
      where: { id },
      relations: ['logo'],
    });

    if (!provider) throw new NotFoundException(`Provider with id=${id} not found`);
    return provider;
  }

  async update(id: string, dto: UpdateProviderDto): Promise<ProviderEntity> {
    const provider = await this.findOne(id);

    Object.assign(provider, {
      ...dto,
      logo: dto.logoId ? ({ id: dto.logoId } as any) : provider.logo,
    });

    return this.providerRepository.save(provider);
  }

  async remove(id: string): Promise<void> {
    const provider = await this.findOne(id);
    await this.providerRepository.remove(provider);
  }
}

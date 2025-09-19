import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProviderEntity } from '../entities/provider.entity';

@Injectable()
export class ProviderRepository extends Repository<ProviderEntity> {}

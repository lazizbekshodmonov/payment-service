import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProviderEntity } from '../entities/provider.entity';

@Injectable()
export class ProviderRepository extends Repository<ProviderEntity> {
  constructor(private dataSource: DataSource) {
    super(ProviderEntity, dataSource.createEntityManager());
  }
}

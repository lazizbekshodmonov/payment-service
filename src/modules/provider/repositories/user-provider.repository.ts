import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserProviderEntity } from '../entities/user-provider.entity';

@Injectable()
export class UserProviderRepository extends Repository<UserProviderEntity> {
  constructor(private dataSource: DataSource) {
    super(UserProviderEntity, dataSource.createEntityManager());
  }
}

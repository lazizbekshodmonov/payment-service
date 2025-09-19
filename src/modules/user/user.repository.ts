import { Injectable } from '@nestjs/common';
import { DataSource, EntityRepository, Like, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRequestQueryDto } from './dto/user-request-query.dto';
import { ProviderEntity } from '../provider/entities/provider.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.findOne({ where: { username } });
  }

  async findByApiKey(apiKey: string): Promise<UserEntity | null> {
    return this.findOne({ where: { apiKey } });
  }

  async findOfPagination(query: UserRequestQueryDto) {
    const { page = 0, size = 10, search, active, type } = query;

    const qb = this.createQueryBuilder('user');

    if (typeof active !== 'undefined') {
      qb.andWhere('user.isActive = :active', { active });
    }

    if (type) {
      qb.andWhere('user.type = :type', { type });
    }

    if (search) {
      qb.andWhere('(user.name ILIKE :search OR user.username ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    qb.orderBy('user.id', 'ASC')
      .skip(page * size)
      .take(size);

    return qb.getManyAndCount();
  }
}

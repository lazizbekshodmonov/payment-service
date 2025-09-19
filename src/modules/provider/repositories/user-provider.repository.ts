import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserProviderEntity } from '../entities/user-provider.entity';

@Injectable()
export class UserProviderRepository extends Repository<UserProviderEntity> {}

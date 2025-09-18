import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { CreatePlumDto } from '../dtos/create-plum.dto';

@Injectable()
export class PlumService {
  private isActive: boolean;
  private isProduction: boolean;
  constructor(private readonly configService: ConfigService) {
    this.isActive = configService.get<boolean>('providers.plum.active') ?? false;
    this.isProduction = configService.get<boolean>('providers.plum.production') ?? false;
  }
  create(createPlumDto: CreatePlumDto) {
    return 'This action adds a new plum';
  }

  findAll() {
    return `This action returns all plum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plum`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePlumDto } from './dto/create-plum.dto';
import { UpdatePlumDto } from './dto/update-plum.dto';
import { ConfigService } from '@nestjs/config';

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

  update(id: number, updatePlumDto: UpdatePlumDto) {
    return `This action updates a #${id} plum`;
  }

  remove(id: number) {
    return `This action removes a #${id} plum`;
  }
}

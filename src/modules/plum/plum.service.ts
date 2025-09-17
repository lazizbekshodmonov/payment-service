import { Injectable } from '@nestjs/common';
import { CreatePlumDto } from './dto/create-plum.dto';
import { UpdatePlumDto } from './dto/update-plum.dto';

@Injectable()
export class PlumService {
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

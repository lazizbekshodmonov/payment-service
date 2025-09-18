import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlumService } from './plum.service';
import { CreatePlumDto } from './dto/create-plum.dto';
import { UpdatePlumDto } from './dto/update-plum.dto';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';

@Controller('plum')
export class PlumController {
  constructor(private readonly plumService: PlumService) {}

  @UseGuards(ApiKeyGuard)
  @Post('pay')
  create(@Body() createPlumDto: CreatePlumDto) {
    return this.plumService.create(createPlumDto);
  }

  @Get()
  findAll() {
    return this.plumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlumDto: UpdatePlumDto) {
    return this.plumService.update(+id, updatePlumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plumService.remove(+id);
  }
}

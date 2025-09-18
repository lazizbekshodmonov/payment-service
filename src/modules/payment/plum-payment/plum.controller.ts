import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreatePlumDto } from '../dtos/create-plum.dto';
import { PlumPaymentService } from './plum-payment.service';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';

@Controller('plum')
export class PlumController {
  constructor(private readonly plumService: PlumPaymentService) {}

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
}

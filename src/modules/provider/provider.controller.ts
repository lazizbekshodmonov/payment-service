import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { UpdateProviderDto } from './dtos/update-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProviderDto) {
    return this.providerService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.providerService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.providerService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() dto: UpdateProviderDto) {
    return this.providerService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: number) {
    return this.providerService.delete(id);
  }
}

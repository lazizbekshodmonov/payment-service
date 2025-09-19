import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PlumService } from './plum.service';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { WithoutRegistrationDto } from './dto/without-registration.dto';

@Controller('plum')
export class PlumController {
  constructor(private readonly plumService: PlumService) {}

  @UseGuards(ApiKeyGuard)
  @Post('pay')
  create(@Body() createPlumDto: WithoutRegistrationDto) {
    return this.plumService.paymentWithoutRegistration(createPlumDto);
  }
}

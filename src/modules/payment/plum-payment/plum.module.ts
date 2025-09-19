import { Module } from '@nestjs/common';
import { PlumController } from './plum.controller';
import { PlumService } from './plum.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PlumController],
  providers: [PlumService],
})
export class PlumModule {}

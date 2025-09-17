import { Module } from '@nestjs/common';
import { PlumService } from './plum.service';
import { PlumController } from './plum.controller';

@Module({
  controllers: [PlumController],
  providers: [PlumService],
})
export class PlumModule {}

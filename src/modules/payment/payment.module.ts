import { Module } from '@nestjs/common';
import { PlumController } from './controllers/plum.controller';
import { PlumService } from './services/plum.service';

@Module({
  controllers: [PlumController],
  providers: [PlumService],
})
export class PaymentModule {}

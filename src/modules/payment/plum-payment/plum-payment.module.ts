import { Module } from '@nestjs/common';
import { PlumController } from './plum.controller';
import { PlumPaymentService } from './plum-payment.service';

@Module({
  controllers: [PlumController],
  providers: [PlumPaymentService],
})
export class PlumPaymentModule {}

import { Module } from '@nestjs/common';
import { PlumPaymentModule } from './plum-payment/plum-payment.module';

@Module({
  imports: [PlumPaymentModule],
  controllers: [],
  providers: [],
})
export class PaymentModule {}

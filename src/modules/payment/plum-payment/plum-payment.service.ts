import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { WithoutRegistrationDto } from './dto/without-registration.dto';
import { HttpService } from '@nestjs/axios';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { ConfirmPaymentResponseDto } from './dto/plum-base-response.dto';
import { ConfirmPaymentResultDto } from './dto/confirm-payment-response.dto';
import { WithoutRegistrationResponseDto } from './dto/without-registration-response.dto';
import { ConfigService } from '@nestjs/config';
import { PaymentReverseDto } from './dto/payment-reverse.dto';
import { PaymentReverseResponseDto } from './dto/payment-reverse-response.dto';
import { PaymentPartialReverseDto } from './dto/payment-partial-reverse.dto';
import { PaymentPartialReverseResponseDto } from './dto/payment-partial-reverse-response.dto';

@Injectable()
export class PlumPaymentService {
  private readonly baseUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const url = configService.get<string>('providers.plum.host');
    if (!url) throw new InternalServerErrorException('Plum host not configured');
    this.baseUrl = url;
  }

  async paymentWithoutRegistration(dto: WithoutRegistrationDto) {
    const url = `${this.baseUrl}/Payment/paymentWithoutRegistration`;
    const response = await firstValueFrom(
      this.httpService.post<ConfirmPaymentResponseDto<WithoutRegistrationResponseDto>, WithoutRegistrationDto>(url, dto, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    return response.data;
  }

  async confirmPayment(dto: ConfirmPaymentDto) {
    const url = `${this.baseUrl}}/Payment/confirmPayment`;
    const response = await firstValueFrom(
      this.httpService.post<ConfirmPaymentResponseDto<ConfirmPaymentResultDto>, ConfirmPaymentDto>(url, dto, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    return response.data;
  }

  async paymentReverse(dto: PaymentReverseDto) {
    const url = `${this.baseUrl}/Payment/paymentReverse`;
    const response = await firstValueFrom(this.httpService.post<ConfirmPaymentResponseDto<PaymentReverseResponseDto>, PaymentReverseDto>(url, dto, { headers: { 'Content-Type': 'application/json' } }));
    return response.data;
  }

  async reversePartial(dto: PaymentPartialReverseDto) {
    const url = `${this.baseUrl}/Payment/reversePartial`;
    const response = await firstValueFrom(this.httpService.post<ConfirmPaymentResponseDto<PaymentPartialReverseResponseDto>, PaymentPartialReverseDto>(url, dto, { headers: { 'Content-Type': 'application/json' } }));
    return response.data;
  }
}

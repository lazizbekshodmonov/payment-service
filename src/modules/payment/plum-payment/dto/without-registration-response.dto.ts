export class WithoutRegistrationResponseDto {
  session: number; // So‘rov sessiyasi
  transactionId: number; // Tranzaksiya IDsi Plum/My Uzcard tizimida
  otpSentPhone: string; // OTP yuborilgan telefon raqami (maskalangan)
}

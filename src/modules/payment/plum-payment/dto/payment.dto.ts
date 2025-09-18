export class PaymentDto {
  userId: string;
  cardId: number;
  amount: number;
  extraId: string;
  sendOtp?: boolean;
  transactionData?: string;
}

import { TransactionStatus } from '../plum.enum';

export class PaymentPartialReverseResponseDto {
  transactionId: number;
  utrno: number;
  status: TransactionStatus;
  statusComment: string;
  terminalId: number;
  merchantId: number;
  cardNumber: string;
  date: string;
  amount: number;
  commission: number;
  totalAmount: number;
  cardId: number;
  transactionData?: string;
}

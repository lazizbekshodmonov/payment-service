import { TransactionStatus } from '../plum.enum';

export class TransactionReverseDto {
  id: number;
  userId: string;
  cardId: number;
  isCredit: boolean;
  cardNumber: string;
  embosName: string;
  utrno: string;
  extraId: string;
  amount: number;
  totalAmount: number;
  createdDate: string; // yoki Date
  finishedDate: string; // yoki Date
  status: TransactionStatus;
  type: number;
  typeComment: string;
  statusComment: string;
  merchantId: string;
  terminalId: string;
}

export class PaymentReverseResponseDto {
  transaction: TransactionReverseDto;
}

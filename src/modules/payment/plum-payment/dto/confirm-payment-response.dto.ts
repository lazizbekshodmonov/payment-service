import { TransactionStatus } from '../plum.enum';

export class ConfirmPaymentResultDto {
  transactionId: number; // Tranzaksiya IDsi
  utrno: string; // Protsessing markazidagi tranzaksiya raqami
  status: TransactionStatus; // Tranzaksiya holati (1 – muvaffaqiyatli)
  statusComment: string; // Tranzaksiya holatining izohi
  terminalId: string; // Terminal identifikatori
  merchantId: string; // Sotuvchi identifikatori
  cardNumber: string; // Maskalangan karta raqami
  date: string; // Tranzaksiya sanasi va vaqti ISO formatda
  amount: number; // To‘lov summasi
  commission: number; // Komissiya summasi
  totalAmount: number; // Umumiy summa (to‘lov + komissiya)
  cardId: number; // Karta IDsi My Uzcard tizimida
  transactionData?: string; // Qo‘shimcha ma’lumot
}

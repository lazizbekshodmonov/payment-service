export enum TransactionStatus {
  CREATED = 0, // Создана
  SUCCESS = 1, // Успешно
  ERROR = 2, // Ошибка
  ERROR_IN_PC = 3, // Ошибка в ПЦ
  CANCELED = 4, // Отменена
  REQUIRES_VERIFICATION = 6, // Требует проверки
  AMOUNT_HOLDED = 7, // Сумма захолдирована
  AMOUNT_UNHOLDED = 8, // Сумма расхолдирована
  REQUIRES_REVERSAL = 9, // Требует отмены
  REQUIRES_MANUAL_CHECK = 10, // Требует ручной проверки
  CANCELED_BY_ADMIN = 11, // Отменено администратором шлюза
  ERROR_ON_AUTO_DEBIT = 12, // Ошибка при автосписании
}

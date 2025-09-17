export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

export enum PaymentProvider {
  PLUM = 'PLUM',
  CLICK = 'CLICK',
  PAYME = 'PAYME',
  PAYNET = 'PAYNET',
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  OTHER = 'OTHER',
}

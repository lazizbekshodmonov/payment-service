import { Entity, Column, Unique, Index, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { TransactionStatus } from '../transaction.enum';
import { UserEntity } from '../../user/entities/user.entity';
import { ProviderType } from '../../provider/provider.enum';

@Entity('transactions')
@Unique(['provider', 'providerTransactionId'])
export class TransactionEntity extends BaseEntity {
  @Column({
    name: 'provider',
    type: 'enum',
    enum: ProviderType,
  })
  provider: ProviderType;

  @Column({ name: 'provider_transaction_id', type: 'varchar', length: 255 })
  providerTransactionId: string;

  @Index()
  @Column({ name: 'order_id', type: 'varchar', nullable: true })
  orderId: string | null;

  @Index()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'amount', type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ name: 'currency', type: 'varchar', length: 10, default: 'UZS' })
  currency: string;

  @Index()
  @Column({
    name: 'status',
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ name: 'payment_method', type: 'varchar', length: 50, nullable: true })
  paymentMethod: string | null;

  @Column({
    name: 'transaction_response',
    type: 'jsonb',
    nullable: true,
  })
  transactionResponse: any;

  @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
  description: string | null;
}

import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PaymentProviderEntity } from './payment-provider.entity';

@Entity('user_payment_providers')
@Unique(['user', 'provider'])
export class UserPaymentProviderEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PaymentProviderEntity)
  @JoinColumn({ name: 'provider_id' })
  provider: PaymentProviderEntity;

  @Column({ name: 'enabled', type: 'boolean', default: false })
  enabled: boolean;

  @Column({ name: 'test_mode', type: 'boolean', default: false })
  testMode: boolean;
}

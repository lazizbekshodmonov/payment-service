import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PaymentProvider } from '../payment.enum';
import { FileEntity } from '../../file/entities/file.entity';

@Entity('payment_providers')
@Unique(['providerType'])
export class PaymentProviderEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => FileEntity)
  @JoinColumn({ name: 'logo_hash_id' })
  logo: FileEntity;

  @Column({
    name: 'provider_type',
    type: 'enum',
    enum: PaymentProvider,
  })
  providerType: PaymentProvider;

  @Column({ name: 'has_test_mode', type: 'boolean', default: false })
  hasTestMode: boolean;

  @Column({ name: 'config', type: 'jsonb', nullable: true })
  config: any;
}

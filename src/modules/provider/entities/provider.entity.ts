import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PaymentProvider } from '../provider.enum';
import { FileEntity } from '../../file/entities/file.entity';

@Entity('payment_providers')
@Unique(['providerType'])
export class ProviderEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => FileEntity, { nullable: true })
  @JoinColumn({ name: 'logo_hash_id' })
  logo: FileEntity | null;

  @Column({
    name: 'provider_type',
    type: 'enum',
    enum: PaymentProvider,
  })
  providerType: PaymentProvider;

  @Column({ name: 'config', type: 'jsonb', nullable: true })
  config: any;
}

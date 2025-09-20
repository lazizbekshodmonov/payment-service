import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ProviderType } from '../provider.enum';
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
    enum: ProviderType,
  })
  providerType: ProviderType;
}

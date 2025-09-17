import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserType } from '../user.enum';

@Entity('users')
@Unique(['username'])
@Unique(['apiKey'])
export class User extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 150 })
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: UserType,
    default: UserType.SERVICE,
  })
  type: UserType;

  @Column({ name: 'username', type: 'varchar', nullable: true })
  username: string | null;

  @Column({ name: 'password_hash', type: 'varchar', nullable: true })
  passwordHash: string | null;

  @Column({ name: 'api_key', type: 'varchar', length: 255, nullable: true })
  apiKey: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;
}

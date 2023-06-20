import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../domain/entities';

import { ETableNames, EUserColumnNames } from '../enums';

import { SessionEntity } from './session.entity';

@Entity({ name: ETableNames.User })
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid', { name: EUserColumnNames.userId })
  userId: string;

  @Column({ type: 'text', name: EUserColumnNames.firstName })
  firstName: string;

  @Column({ type: 'text', name: EUserColumnNames.lastName })
  lastName: string;

  @Column({ type: 'text', name: EUserColumnNames.email })
  email: string;

  @Column({
    type: 'text',
    name: EUserColumnNames.personalNumberId,
    nullable: true,
  })
  personalNumberId: string | null;

  @Column({ type: 'text', name: EUserColumnNames.passHash })
  passHash: string;

  @Column({
    type: 'text',
    name: EUserColumnNames.passResetToken,
    nullable: true,
  })
  passResetToken: string | null;

  @Column({
    type: 'timestamptz',
    name: EUserColumnNames.passResetExpire,
    nullable: true,
  })
  passResetExpire: Date | null;

  @Column({ type: 'boolean', name: EUserColumnNames.isAdmin, default: false })
  isAdmin: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: EUserColumnNames.createdDate })
  createdDate: Date;

  @Column({ type: 'boolean', name: EUserColumnNames.enabled, default: true })
  enabled: boolean;

  @OneToMany(() => SessionEntity, (session) => session.user)
  session: SessionEntity[];
}

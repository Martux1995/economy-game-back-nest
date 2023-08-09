import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Session } from '../../../domain/models';

import { ESessionColumnNames, ETableNames } from '../enums';

import { UserEntity } from './user.entity';

@Entity({ name: ETableNames.Session })
export class SessionEntity extends BaseEntity implements Session {
  @PrimaryGeneratedColumn('uuid', { name: ESessionColumnNames.sessionId })
  sessionId: string;

  @CreateDateColumn({
    type: 'timestamptz',
    name: ESessionColumnNames.createdDate,
  })
  createdDate: Date;

  @Column({ type: 'timestamptz', name: ESessionColumnNames.expiredDate })
  expiredDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.session)
  @JoinColumn({ name: ESessionColumnNames.userId })
  user: UserEntity;
}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ESessionColumnNames, ETableNames } from '../enums';
import { Session } from '../../../domain/entities';

@Entity({ name: ETableNames.Session })
export class SessionEntity extends BaseEntity implements Session {
  @PrimaryGeneratedColumn({ name: ESessionColumnNames.sessionId })
  sessionId: number;

  @Column({ type: 'text', name: ESessionColumnNames.sessionKey })
  key: string;

  @CreateDateColumn({ name: ESessionColumnNames.createdDate })
  createdDate: Date;

  @Column({ type: 'timestamp', name: ESessionColumnNames.expiredDate })
  expiredDate: Date;

  @ManyToOne(() => UserEntity, (u) => u.session)
  @JoinColumn({ name: ESessionColumnNames.userId })
  user: UserEntity;
}

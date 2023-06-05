import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ETableNames, EUserColumnNames } from '../enums';
import { User } from '../../../domain/entities';
import { PersonEntity } from './person.entity';
import { SessionEntity } from './session.entity';

@Entity({ name: ETableNames.User })
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn({ name: EUserColumnNames.userId })
  userId: number;

  @Column({ type: 'text', name: EUserColumnNames.passHash })
  passHash: string;

  @Column({ type: 'boolean', name: EUserColumnNames.isAdmin, default: false })
  isAdmin: boolean;

  @CreateDateColumn({ name: EUserColumnNames.createdDate })
  createdDate: Date;

  @Column({ type: 'boolean', name: EUserColumnNames.enabled, default: true })
  enabled: boolean;

  @OneToOne(() => PersonEntity, (p) => p.personId)
  @JoinColumn({
    name: EUserColumnNames.personId,
  })
  person: PersonEntity;

  @OneToMany(() => SessionEntity, (s) => s.sessionId)
  session: SessionEntity[];
}

import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ETableNames, EPersonColumnNames } from '../enums';
import { Person } from '../../../domain/entities/person.entity';

@Entity({ name: ETableNames.Person })
export class PersonEntity extends BaseEntity implements Person {
  @PrimaryGeneratedColumn({ name: EPersonColumnNames.personId })
  personId: number;

  @Column({
    type: 'text',
    name: EPersonColumnNames.personNumberId,
    unique: true,
  })
  personNumberId: string;

  @Column({ type: 'text', name: EPersonColumnNames.firstName })
  firstName: string;

  @Column({ type: 'text', name: EPersonColumnNames.lastName })
  lastName: string;

  @Column({ type: 'text', name: EPersonColumnNames.email, unique: true })
  email: string;

  @CreateDateColumn({ name: EPersonColumnNames.createdDate })
  createdDate: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}

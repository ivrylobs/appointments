import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'doctor',
})
export class DoctorEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  specialization: string;

  @Column({
    nullable: false,
    type: String,
  })
  licenseId: string;

  @Column({
    nullable: false,
    type: String,
    unique: true,
  })
  userId?: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'patient',
})
export class PatientEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  medicalId?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  userId?: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

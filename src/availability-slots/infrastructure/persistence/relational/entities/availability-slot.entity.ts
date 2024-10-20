import { DoctorEntity } from '../../../../../doctors/infrastructure/persistence/relational/entities/doctor.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'availability_slot',
})
export class AvailabilitySlotEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: 'datetime',
  })
  endTime: Date;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  startTime: Date;

  @ManyToOne(() => DoctorEntity, { eager: true, nullable: false })
  doctorId: DoctorEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

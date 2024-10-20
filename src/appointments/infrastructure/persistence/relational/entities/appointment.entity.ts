import { AvailabilitySlotEntity } from '../../../../../availability-slots/infrastructure/persistence/relational/entities/availability-slot.entity';

import { DoctorEntity } from '../../../../../doctors/infrastructure/persistence/relational/entities/doctor.entity';

import { PatientEntity } from '../../../../../patients/infrastructure/persistence/relational/entities/patient.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'appointment',
})
export class AppointmentEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  note?: string | null;

  @Column({
    nullable: false,
    type: Boolean,
  })
  status?: boolean;

  @OneToOne(() => AvailabilitySlotEntity, { eager: true, nullable: false })
  @JoinColumn()
  availabilitySlot: AvailabilitySlotEntity;

  @ManyToOne(() => DoctorEntity, { eager: true, nullable: false })
  doctor?: DoctorEntity;

  @ManyToOne(() => PatientEntity, { eager: true, nullable: false })
  patient?: PatientEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

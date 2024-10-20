import { Appointment } from '../../../../domain/appointment';

import { AvailabilitySlotMapper } from '../../../../../availability-slots/infrastructure/persistence/relational/mappers/availability-slot.mapper';

import { DoctorMapper } from '../../../../../doctors/infrastructure/persistence/relational/mappers/doctor.mapper';

import { PatientMapper } from '../../../../../patients/infrastructure/persistence/relational/mappers/patient.mapper';

import { AppointmentEntity } from '../entities/appointment.entity';

export class AppointmentMapper {
  static toDomain(raw: AppointmentEntity): Appointment {
    const domainEntity = new Appointment();
    domainEntity.note = raw.note;

    domainEntity.status = raw.status;

    if (raw.availabilitySlot) {
      domainEntity.availabilitySlot = AvailabilitySlotMapper.toDomain(
        raw.availabilitySlot,
      );
    }

    if (raw.doctor) {
      domainEntity.doctor = DoctorMapper.toDomain(raw.doctor);
    }

    if (raw.patient) {
      domainEntity.patient = PatientMapper.toDomain(raw.patient);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Appointment): AppointmentEntity {
    const persistenceEntity = new AppointmentEntity();
    persistenceEntity.note = domainEntity.note;

    persistenceEntity.status = domainEntity.status;

    if (domainEntity.availabilitySlot) {
      persistenceEntity.availabilitySlot = AvailabilitySlotMapper.toPersistence(
        domainEntity.availabilitySlot,
      );
    }

    if (domainEntity.doctor) {
      persistenceEntity.doctor = DoctorMapper.toPersistence(
        domainEntity.doctor,
      );
    }

    if (domainEntity.patient) {
      persistenceEntity.patient = PatientMapper.toPersistence(
        domainEntity.patient,
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

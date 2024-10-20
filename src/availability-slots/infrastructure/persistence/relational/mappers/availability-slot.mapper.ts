import { AvailabilitySlot } from '../../../../domain/availability-slot';

import { DoctorMapper } from '../../../../../doctors/infrastructure/persistence/relational/mappers/doctor.mapper';

import { AvailabilitySlotEntity } from '../entities/availability-slot.entity';

export class AvailabilitySlotMapper {
  static toDomain(raw: AvailabilitySlotEntity): AvailabilitySlot {
    const domainEntity = new AvailabilitySlot();
    domainEntity.endTime = raw.endTime;

    domainEntity.startTime = raw.startTime;

    if (raw.doctorId) {
      domainEntity.doctorId = DoctorMapper.toDomain(raw.doctorId);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: AvailabilitySlot): AvailabilitySlotEntity {
    const persistenceEntity = new AvailabilitySlotEntity();
    persistenceEntity.endTime = domainEntity.endTime;

    persistenceEntity.startTime = domainEntity.startTime;

    if (domainEntity.doctorId) {
      persistenceEntity.doctorId = DoctorMapper.toPersistence(
        domainEntity.doctorId,
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

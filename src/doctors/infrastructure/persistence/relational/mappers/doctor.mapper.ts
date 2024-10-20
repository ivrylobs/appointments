import { Doctor } from '../../../../domain/doctor';

import { DoctorEntity } from '../entities/doctor.entity';

export class DoctorMapper {
  static toDomain(raw: DoctorEntity): Doctor {
    const domainEntity = new Doctor();
    domainEntity.specialization = raw.specialization;

    domainEntity.licenseId = raw.licenseId;

    domainEntity.userId = raw.userId;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Doctor): DoctorEntity {
    const persistenceEntity = new DoctorEntity();
    persistenceEntity.specialization = domainEntity.specialization;

    persistenceEntity.licenseId = domainEntity.licenseId;

    persistenceEntity.userId = domainEntity.userId;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

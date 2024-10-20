import { Patient } from '../../../../domain/patient';

import { PatientEntity } from '../entities/patient.entity';

export class PatientMapper {
  static toDomain(raw: PatientEntity): Patient {
    const domainEntity = new Patient();
    domainEntity.medicalId = raw.medicalId;

    domainEntity.userId = raw.userId;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Patient): PatientEntity {
    const persistenceEntity = new PatientEntity();
    persistenceEntity.medicalId = domainEntity.medicalId;

    persistenceEntity.userId = domainEntity.userId;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}

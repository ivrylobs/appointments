import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PatientEntity } from '../entities/patient.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Patient } from '../../../../domain/patient';
import { PatientRepository } from '../../patient.repository';
import { PatientMapper } from '../mappers/patient.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PatientRelationalRepository implements PatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  async create(data: Patient): Promise<Patient> {
    const persistenceModel = PatientMapper.toPersistence(data);
    const newEntity = await this.patientRepository.save(
      this.patientRepository.create(persistenceModel),
    );
    return PatientMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Patient[]> {
    const entities = await this.patientRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PatientMapper.toDomain(entity));
  }

  async findById(id: Patient['id']): Promise<NullableType<Patient>> {
    const entity = await this.patientRepository.findOne({
      where: { id },
    });

    return entity ? PatientMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Patient['id'][]): Promise<Patient[]> {
    const entities = await this.patientRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PatientMapper.toDomain(entity));
  }

  async findByUserId(
    userId: Patient['userId'],
  ): Promise<NullableType<Patient>> {
    const entity = await this.patientRepository.findOne({ where: { userId } });

    return entity ? PatientMapper.toDomain(entity) : null;
  }

  async update(id: Patient['id'], payload: Partial<Patient>): Promise<Patient> {
    const entity = await this.patientRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.patientRepository.save(
      this.patientRepository.create(
        PatientMapper.toPersistence({
          ...PatientMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PatientMapper.toDomain(updatedEntity);
  }

  async remove(id: Patient['id']): Promise<void> {
    await this.patientRepository.delete(id);
  }
}

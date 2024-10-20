import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Doctor } from '../../../../domain/doctor';
import { DoctorRepository } from '../../doctor.repository';
import { DoctorMapper } from '../mappers/doctor.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DoctorRelationalRepository implements DoctorRepository {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(data: Doctor): Promise<Doctor> {
    const persistenceModel = DoctorMapper.toPersistence(data);
    const newEntity = await this.doctorRepository.save(
      this.doctorRepository.create(persistenceModel),
    );
    return DoctorMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Doctor[]> {
    const entities = await this.doctorRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => DoctorMapper.toDomain(entity));
  }

  async findById(id: Doctor['id']): Promise<NullableType<Doctor>> {
    const entity = await this.doctorRepository.findOne({
      where: { id },
    });

    return entity ? DoctorMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Doctor['id'][]): Promise<Doctor[]> {
    const entities = await this.doctorRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DoctorMapper.toDomain(entity));
  }
  async findByUserId(userId: Doctor['userId']): Promise<NullableType<Doctor>> {
    const entity = await this.doctorRepository.findOne({ where: { userId } });

    return entity ? DoctorMapper.toDomain(entity) : null;
  }

  async update(id: Doctor['id'], payload: Partial<Doctor>): Promise<Doctor> {
    const entity = await this.doctorRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.doctorRepository.save(
      this.doctorRepository.create(
        DoctorMapper.toPersistence({
          ...DoctorMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DoctorMapper.toDomain(updatedEntity);
  }

  async remove(id: Doctor['id']): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}

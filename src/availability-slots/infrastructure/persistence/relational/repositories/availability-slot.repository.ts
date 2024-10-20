import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AvailabilitySlotEntity } from '../entities/availability-slot.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { AvailabilitySlot } from '../../../../domain/availability-slot';
import { AvailabilitySlotRepository } from '../../availability-slot.repository';
import { AvailabilitySlotMapper } from '../mappers/availability-slot.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class AvailabilitySlotRelationalRepository
  implements AvailabilitySlotRepository
{
  constructor(
    @InjectRepository(AvailabilitySlotEntity)
    private readonly availabilitySlotRepository: Repository<AvailabilitySlotEntity>,
  ) {}

  async create(data: AvailabilitySlot): Promise<AvailabilitySlot> {
    const persistenceModel = AvailabilitySlotMapper.toPersistence(data);
    const newEntity = await this.availabilitySlotRepository.save(
      this.availabilitySlotRepository.create(persistenceModel),
    );
    return AvailabilitySlotMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AvailabilitySlot[]> {
    const entities = await this.availabilitySlotRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => AvailabilitySlotMapper.toDomain(entity));
  }

  async findById(
    id: AvailabilitySlot['id'],
  ): Promise<NullableType<AvailabilitySlot>> {
    const entity = await this.availabilitySlotRepository.findOne({
      where: { id },
    });

    return entity ? AvailabilitySlotMapper.toDomain(entity) : null;
  }

  async findByDoctorId(
    doctorId: AvailabilitySlot['doctorId'],
  ): Promise<AvailabilitySlot[]> {
    const entities = await this.availabilitySlotRepository.find({
      where: { doctorId: { id: doctorId.id } },
    });

    return entities.map((entity) => AvailabilitySlotMapper.toDomain(entity));
  }

  async findByIds(ids: AvailabilitySlot['id'][]): Promise<AvailabilitySlot[]> {
    const entities = await this.availabilitySlotRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => AvailabilitySlotMapper.toDomain(entity));
  }

  async update(
    id: AvailabilitySlot['id'],
    payload: Partial<AvailabilitySlot>,
  ): Promise<AvailabilitySlot> {
    const entity = await this.availabilitySlotRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.availabilitySlotRepository.save(
      this.availabilitySlotRepository.create(
        AvailabilitySlotMapper.toPersistence({
          ...AvailabilitySlotMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AvailabilitySlotMapper.toDomain(updatedEntity);
  }

  async remove(id: AvailabilitySlot['id']): Promise<void> {
    await this.availabilitySlotRepository.delete(id);
  }
}

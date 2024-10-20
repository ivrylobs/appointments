import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AvailabilitySlot } from '../../domain/availability-slot';

export abstract class AvailabilitySlotRepository {
  abstract create(
    data: Omit<AvailabilitySlot, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AvailabilitySlot>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AvailabilitySlot[]>;

  abstract findById(
    id: AvailabilitySlot['id'],
  ): Promise<NullableType<AvailabilitySlot>>;

  abstract findByDoctorId(
    doctor: AvailabilitySlot['doctorId'],
  ): Promise<AvailabilitySlot[]>;

  abstract findByIds(
    ids: AvailabilitySlot['id'][],
  ): Promise<AvailabilitySlot[]>;

  abstract update(
    id: AvailabilitySlot['id'],
    payload: DeepPartial<AvailabilitySlot>,
  ): Promise<AvailabilitySlot | null>;

  abstract remove(id: AvailabilitySlot['id']): Promise<void>;
}

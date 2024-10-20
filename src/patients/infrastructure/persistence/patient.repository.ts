import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Patient } from '../../domain/patient';

export abstract class PatientRepository {
  abstract create(
    data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Patient>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Patient[]>;

  abstract findById(id: Patient['id']): Promise<NullableType<Patient>>;

  abstract findByIds(ids: Patient['id'][]): Promise<Patient[]>;

  abstract findByUserId(
    userId: Patient['userId'],
  ): Promise<NullableType<Patient>>;

  abstract update(
    id: Patient['id'],
    payload: DeepPartial<Patient>,
  ): Promise<Patient | null>;

  abstract remove(id: Patient['id']): Promise<void>;
}

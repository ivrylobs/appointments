import {
  HttpStatus,
  Injectable,
  Request,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepository } from './infrastructure/persistence/patient.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Patient } from './domain/patient';

@Injectable()
export class PatientsService {
  constructor(
    // Dependencies here
    private readonly patientRepository: PatientRepository,
  ) {}

  async create(createPatientDto: CreatePatientDto, @Request() request) {
    const existingPatient = await this.patientRepository.findByUserId(
      request.user.id,
    );

    if (existingPatient)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          patient: 'this user already registered as Patient',
        },
      });

    // Do not remove comment below.
    // <creating-property />

    return this.patientRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      medicalId: createPatientDto.medicalId,

      userId: request.user.id,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.patientRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Patient['id']) {
    return this.patientRepository.findById(id);
  }

  findByIds(ids: Patient['id'][]) {
    return this.patientRepository.findByIds(ids);
  }

  findByUserId(userId: Patient['userId']) {
    return this.patientRepository.findByUserId(userId);
  }

  async update(
    id: Patient['id'],

    updatePatientDto: UpdatePatientDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.patientRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      medicalId: updatePatientDto.medicalId,

      userId: updatePatientDto.userId,
    });
  }

  remove(id: Patient['id']) {
    return this.patientRepository.remove(id);
  }
}

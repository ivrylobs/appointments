import { Injectable, Request } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorRepository } from './infrastructure/persistence/doctor.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Doctor } from './domain/doctor';

@Injectable()
export class DoctorsService {
  constructor(
    // Dependencies here
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async create(createDoctorDto: CreateDoctorDto, @Request() request) {
    // Do not remove comment below.
    // <creating-property />

    return this.doctorRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      specialization: createDoctorDto.specialization,

      licenseId: createDoctorDto.licenseId,

      userId: request.user.id,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.doctorRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Doctor['id']) {
    return this.doctorRepository.findById(id);
  }

  findByIds(ids: Doctor['id'][]) {
    return this.doctorRepository.findByIds(ids);
  }

  async update(
    id: Doctor['id'],

    updateDoctorDto: UpdateDoctorDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.doctorRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      specialization: updateDoctorDto.specialization,

      licenseId: updateDoctorDto.licenseId,
    });
  }

  remove(id: Doctor['id']) {
    return this.doctorRepository.remove(id);
  }
}

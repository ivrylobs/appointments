import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/domain/doctor';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateAvailabilitySlotDto } from './dto/create-availability-slot.dto';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';
import { AvailabilitySlotRepository } from './infrastructure/persistence/availability-slot.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AvailabilitySlot } from './domain/availability-slot';

@Injectable()
export class AvailabilitySlotsService {
  constructor(
    private readonly doctorService: DoctorsService,

    // Dependencies here
    private readonly availabilitySlotRepository: AvailabilitySlotRepository,
  ) {}

  private async validateSlotConflict(
    doctorId: any,
    createAvailabilitySlotDto: CreateAvailabilitySlotDto,
  ) {
    const existingSlots =
      await this.availabilitySlotRepository.findByDoctorId(doctorId);

    const newStartTime = new Date(createAvailabilitySlotDto.startTime);
    const newEndTime = new Date(createAvailabilitySlotDto.endTime);

    for (const slot of existingSlots) {
      const existingStartTime = new Date(slot.startTime);
      const existingEndTime = new Date(slot.endTime);

      // Check for overlapping slots
      if (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
        (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            timeSlot: 'conflictWithExistingSlot',
          },
        });
      }
    }
  }

  async create(createAvailabilitySlotDto: CreateAvailabilitySlotDto) {
    // Do not remove comment below.
    // <creating-property />

    const doctorIdObject = await this.doctorService.findById(
      createAvailabilitySlotDto.doctorId.id,
    );
    if (!doctorIdObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          doctorId: 'notExists',
        },
      });
    }
    const doctorId = doctorIdObject;

    await this.validateSlotConflict(doctorId, createAvailabilitySlotDto);

    // Convert input times to UTC before storing in the database
    const startTime = new Date(createAvailabilitySlotDto.startTime);
    const endTime = new Date(createAvailabilitySlotDto.endTime);

    return this.availabilitySlotRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      endTime: endTime,

      startTime: startTime,

      doctorId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.availabilitySlotRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AvailabilitySlot['id']) {
    return this.availabilitySlotRepository.findById(id);
  }

  findByIds(ids: AvailabilitySlot['id'][]) {
    return this.availabilitySlotRepository.findByIds(ids);
  }

  async update(
    id: AvailabilitySlot['id'],

    updateAvailabilitySlotDto: UpdateAvailabilitySlotDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let doctorId: Doctor | undefined = undefined;

    if (updateAvailabilitySlotDto.doctorId) {
      const doctorIdObject = await this.doctorService.findById(
        updateAvailabilitySlotDto.doctorId.id,
      );
      if (!doctorIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            doctorId: 'notExists',
          },
        });
      }
      doctorId = doctorIdObject;
    }

    return this.availabilitySlotRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      endTime: updateAvailabilitySlotDto.endTime,

      startTime: updateAvailabilitySlotDto.startTime,

      doctorId,
    });
  }

  remove(id: AvailabilitySlot['id']) {
    return this.availabilitySlotRepository.remove(id);
  }
}

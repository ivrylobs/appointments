import { AvailabilitySlotsService } from '../availability-slots/availability-slots.service';
import { AvailabilitySlot } from '../availability-slots/domain/availability-slot';

import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/domain/doctor';

import { PatientsService } from '../patients/patients.service';
import { Patient } from '../patients/domain/patient';

import {
  HttpStatus,
  Request,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentRepository } from './infrastructure/persistence/appointment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Appointment } from './domain/appointment';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly availabilitySlotService: AvailabilitySlotsService,

    private readonly doctorService: DoctorsService,

    private readonly patientService: PatientsService,

    // Dependencies here
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, @Request() request) {
    // Do not remove comment below.
    // <creating-property />

    const availabilitySlotObject = await this.availabilitySlotService.findById(
      createAppointmentDto.availabilitySlot.id,
    );
    if (!availabilitySlotObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          availabilitySlot: 'notExists',
        },
      });
    }
    const availabilitySlot = availabilitySlotObject;

    let doctor: Doctor | undefined = undefined;

    if (createAppointmentDto.doctor) {
      const doctorObject = await this.doctorService.findById(
        availabilitySlot.doctorId.id,
      );
      if (!doctorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            doctor: 'notExists',
          },
        });
      }
      doctor = doctorObject;
    }

    let patient: Patient | undefined = undefined;

    if (createAppointmentDto.patient) {
      const patientObject = await this.patientService.findByUserId(
        request.user.id,
      );
      if (!patientObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            patient: 'notExists',
          },
        });
      }
      patient = patientObject;
    }

    return this.appointmentRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      note: createAppointmentDto.note,

      status: createAppointmentDto.status,

      availabilitySlot,

      doctor,

      patient,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.appointmentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Appointment['id']) {
    return this.appointmentRepository.findById(id);
  }

  findByIds(ids: Appointment['id'][]) {
    return this.appointmentRepository.findByIds(ids);
  }

  async update(
    id: Appointment['id'],

    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let availabilitySlot: AvailabilitySlot | undefined = undefined;

    if (updateAppointmentDto.availabilitySlot) {
      const availabilitySlotObject =
        await this.availabilitySlotService.findById(
          updateAppointmentDto.availabilitySlot.id,
        );
      if (!availabilitySlotObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            availabilitySlot: 'notExists',
          },
        });
      }
      availabilitySlot = availabilitySlotObject;
    }

    let doctor: Doctor | undefined = undefined;

    if (updateAppointmentDto.doctor) {
      const doctorObject = await this.doctorService.findById(
        updateAppointmentDto.doctor.id,
      );
      if (!doctorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            doctor: 'notExists',
          },
        });
      }
      doctor = doctorObject;
    }

    let patient: Patient | undefined = undefined;

    if (updateAppointmentDto.patient) {
      const patientObject = await this.patientService.findById(
        updateAppointmentDto.patient.id,
      );
      if (!patientObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            patient: 'notExists',
          },
        });
      }
      patient = patientObject;
    }

    return this.appointmentRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      note: updateAppointmentDto.note,

      status: updateAppointmentDto.status,

      availabilitySlot,

      doctor,

      patient,
    });
  }

  remove(id: Appointment['id']) {
    return this.appointmentRepository.remove(id);
  }
}

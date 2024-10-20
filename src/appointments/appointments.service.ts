import { AvailabilitySlotsService } from '../availability-slots/availability-slots.service';
import { AvailabilitySlot } from '../availability-slots/domain/availability-slot';

import { DoctorsService } from '../doctors/doctors.service';
import { Doctor } from '../doctors/domain/doctor';

import { PatientsService } from '../patients/patients.service';
import { Patient } from '../patients/domain/patient';

import {
  BadRequestException,
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
import { AppointmentStatus } from './infrastructure/persistence/relational/enums/appointmentStatus.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly availabilitySlotService: AvailabilitySlotsService,

    private readonly doctorService: DoctorsService,

    private readonly patientService: PatientsService,

    // Dependencies here
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  private async validateAppointmentConflictOnSlot(
    availabilitySlot: AvailabilitySlot,
  ) {
    const conflictAppointment =
      await this.appointmentRepository.findByAvailabilitySlotIdAndStatus(
        availabilitySlot,
        AppointmentStatus.BOOKED,
      );

    if (conflictAppointment)
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          availabilitySlot: "This slot not available it's already booked",
        },
      });
  }
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

    await this.validateAppointmentConflictOnSlot(availabilitySlot);

    const doctor = await this.doctorService.findById(
      availabilitySlot.doctorId.id,
    );

    if (!doctor) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          doctor: 'notExists',
        },
      });
    }

    const patient = await this.patientService.findByUserId(request.user.id);

    if (!patient) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          patient: 'notExists',
        },
      });
    }

    return this.appointmentRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      note: createAppointmentDto.note,

      status: AppointmentStatus.BOOKED,

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

    const currentAppointment = await this.appointmentRepository.findById(id);

    if (!currentAppointment)
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          appointment:
            'Incorrect appointmentId or this appointment does not existed',
        },
      });

    if (
      (updateAppointmentDto.status === AppointmentStatus.COMPLETED &&
        currentAppointment.status === AppointmentStatus.CANCELLED) ||
      (updateAppointmentDto.status === AppointmentStatus.CANCELLED &&
        currentAppointment.status === AppointmentStatus.COMPLETED)
    )
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          appointment:
            'Cannot change status completed on cancelled appointment either cancel appointment on completed appointment',
        },
      });

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

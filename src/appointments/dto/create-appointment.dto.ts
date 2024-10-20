import { AvailabilitySlotDto } from '../../availability-slots/dto/availability-slot.dto';

import { DoctorDto } from '../../doctors/dto/doctor.dto';

import { PatientDto } from '../../patients/dto/patient.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  note?: string | null;

  status?: boolean;

  @ApiProperty({
    required: true,
    type: () => AvailabilitySlotDto,
  })
  @ValidateNested()
  @Type(() => AvailabilitySlotDto)
  @IsNotEmptyObject()
  availabilitySlot: AvailabilitySlotDto;

  doctor?: DoctorDto;

  patient?: PatientDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}

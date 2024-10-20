import { DoctorDto } from '../../doctors/dto/doctor.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsDateString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateAvailabilitySlotDto {
  @ApiProperty({
    required: true,
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    required: true,
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    required: true,
    type: () => DoctorDto,
  })
  @ValidateNested()
  @Type(() => DoctorDto)
  @IsNotEmptyObject()
  doctorId: DoctorDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}

import { AvailabilitySlot } from '../../availability-slots/domain/availability-slot';
import { Doctor } from '../../doctors/domain/doctor';
import { Patient } from '../../patients/domain/patient';
import { ApiProperty } from '@nestjs/swagger';

export class Appointment {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  status?: boolean;

  @ApiProperty({
    type: () => AvailabilitySlot,
    nullable: false,
  })
  availabilitySlot: AvailabilitySlot;

  @ApiProperty({
    type: () => Doctor,
    nullable: false,
  })
  doctor?: Doctor;

  @ApiProperty({
    type: () => Patient,
    nullable: false,
  })
  patient?: Patient;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

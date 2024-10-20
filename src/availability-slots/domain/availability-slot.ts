import { Doctor } from '../../doctors/domain/doctor';
import { ApiProperty } from '@nestjs/swagger';

export class AvailabilitySlot {
  @ApiProperty({
    nullable: false,
  })
  endTime: Date;

  @ApiProperty({
    nullable: false,
  })
  startTime: Date;

  @ApiProperty({
    type: () => Doctor,
    nullable: false,
  })
  doctorId: Doctor;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';

export class Doctor {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  specialization: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  licenseId: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  userId?: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

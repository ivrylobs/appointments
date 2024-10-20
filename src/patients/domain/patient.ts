import { ApiProperty } from '@nestjs/swagger';

export class Patient {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  medicalId?: string | null;

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

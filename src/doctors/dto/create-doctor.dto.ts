import {
  // decorators here

  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  specialization: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  licenseId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}

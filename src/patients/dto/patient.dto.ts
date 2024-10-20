import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PatientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

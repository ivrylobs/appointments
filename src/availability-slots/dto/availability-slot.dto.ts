import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AvailabilitySlotDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAvailabilitySlotDto } from './create-availability-slot.dto';

export class UpdateAvailabilitySlotDto extends PartialType(
  CreateAvailabilitySlotDto,
) {}

import { DoctorsModule } from '../doctors/doctors.module';
import { Module } from '@nestjs/common';
import { AvailabilitySlotsService } from './availability-slots.service';
import { AvailabilitySlotsController } from './availability-slots.controller';
import { RelationalAvailabilitySlotPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    DoctorsModule,

    // import modules, etc.
    RelationalAvailabilitySlotPersistenceModule,
  ],
  controllers: [AvailabilitySlotsController],
  providers: [AvailabilitySlotsService],
  exports: [
    AvailabilitySlotsService,
    RelationalAvailabilitySlotPersistenceModule,
  ],
})
export class AvailabilitySlotsModule {}

import { Module } from '@nestjs/common';
import { AvailabilitySlotRepository } from '../availability-slot.repository';
import { AvailabilitySlotRelationalRepository } from './repositories/availability-slot.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilitySlotEntity } from './entities/availability-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvailabilitySlotEntity])],
  providers: [
    {
      provide: AvailabilitySlotRepository,
      useClass: AvailabilitySlotRelationalRepository,
    },
  ],
  exports: [AvailabilitySlotRepository],
})
export class RelationalAvailabilitySlotPersistenceModule {}

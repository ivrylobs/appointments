import { AvailabilitySlotsModule } from '../availability-slots/availability-slots.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { RelationalAppointmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    AvailabilitySlotsModule,

    DoctorsModule,

    PatientsModule,

    // import modules, etc.
    RelationalAppointmentPersistenceModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService, RelationalAppointmentPersistenceModule],
})
export class AppointmentsModule {}

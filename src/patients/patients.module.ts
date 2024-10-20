import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { RelationalPatientPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalPatientPersistenceModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService, RelationalPatientPersistenceModule],
})
export class PatientsModule {}

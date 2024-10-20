import { Module } from '@nestjs/common';
import { DoctorRepository } from '../doctor.repository';
import { DoctorRelationalRepository } from './repositories/doctor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [
    {
      provide: DoctorRepository,
      useClass: DoctorRelationalRepository,
    },
  ],
  exports: [DoctorRepository],
})
export class RelationalDoctorPersistenceModule {}

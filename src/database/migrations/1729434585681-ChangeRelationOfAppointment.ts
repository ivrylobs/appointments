import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRelationOfAppointment1729434585681
  implements MigrationInterface
{
  name = 'ChangeRelationOfAppointment1729434585681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`note\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`status\` enum ('booked', 'completed', 'cancelled') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`availabilitySlotId\` uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`doctorId\` uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_78159abef4597928260cf8e6af4\` FOREIGN KEY (\`availabilitySlotId\`) REFERENCES \`availability_slot\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_514bcc3fb1b8140f85bf1cde6e2\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_514bcc3fb1b8140f85bf1cde6e2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_78159abef4597928260cf8e6af4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP COLUMN \`doctorId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP COLUMN \`availabilitySlotId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(`ALTER TABLE \`appointment\` DROP COLUMN \`note\``);
  }
}

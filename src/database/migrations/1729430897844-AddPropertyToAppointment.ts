import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPropertyToAppointment1729430897844
  implements MigrationInterface
{
  name = 'AddPropertyToAppointment1729430897844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`note\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`status\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`availabilitySlotId\` uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD UNIQUE INDEX \`IDX_78159abef4597928260cf8e6af\` (\`availabilitySlotId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` ADD \`doctorId\` uuid NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_78159abef4597928260cf8e6af\` ON \`appointment\` (\`availabilitySlotId\`)`,
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
      `DROP INDEX \`REL_78159abef4597928260cf8e6af\` ON \`appointment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP COLUMN \`doctorId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment\` DROP INDEX \`IDX_78159abef4597928260cf8e6af\``,
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

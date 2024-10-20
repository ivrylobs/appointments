import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAvailabilitySlotDateTime1729424730215
  implements MigrationInterface
{
  name = 'ChangeAvailabilitySlotDateTime1729424730215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` DROP COLUMN \`endTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` ADD \`endTime\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` DROP COLUMN \`startTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` ADD \`startTime\` datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` DROP COLUMN \`startTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` ADD \`startTime\` date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` DROP COLUMN \`endTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` ADD \`endTime\` date NOT NULL`,
    );
  }
}

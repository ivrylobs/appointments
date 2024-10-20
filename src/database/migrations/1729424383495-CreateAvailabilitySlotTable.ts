import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAvailabilitySlotTable1729424383495
  implements MigrationInterface
{
  name = 'CreateAvailabilitySlotTable1729424383495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`availability_slot\` (\`endTime\` date NOT NULL, \`startTime\` date NOT NULL, \`id\` uuid NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`doctorIdId\` uuid NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` ADD CONSTRAINT \`FK_dbc07d66562a06f33b653819835\` FOREIGN KEY (\`doctorIdId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`availability_slot\` DROP FOREIGN KEY \`FK_dbc07d66562a06f33b653819835\``,
    );
    await queryRunner.query(`DROP TABLE \`availability_slot\``);
  }
}

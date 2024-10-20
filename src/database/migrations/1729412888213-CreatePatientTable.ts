import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientTable1729412888213 implements MigrationInterface {
  name = 'CreatePatientTable1729412888213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`patient\` (\`medicalId\` varchar(255) NULL, \`userId\` varchar(255) NOT NULL, \`id\` uuid NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`patient\``);
  }
}

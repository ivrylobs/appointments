import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorTable1729353753210 implements MigrationInterface {
  name = 'CreateDoctorTable1729353753210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`doctor\` (\`specialization\` varchar(255) NOT NULL, \`licenseId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`id\` uuid NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e573a17ab8b6eea2b7fe9905fa\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e573a17ab8b6eea2b7fe9905fa\` ON \`doctor\``,
    );
    await queryRunner.query(`DROP TABLE \`doctor\``);
  }
}

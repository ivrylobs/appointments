import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1729249314834 implements MigrationInterface {
  name = 'InitDB1729249314834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`file\` (\`id\` uuid NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`file\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}

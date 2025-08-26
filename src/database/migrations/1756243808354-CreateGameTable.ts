import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameTable1756243808354 implements MigrationInterface {
    name = 'CreateGameTable1756243808354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`board\` json NOT NULL, \`winner\` text NULL, \`isDraw\` tinyint NOT NULL DEFAULT 0, \`currentPlayer\` varchar(255) NOT NULL, \`playedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`status\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`games\``);
    }

}

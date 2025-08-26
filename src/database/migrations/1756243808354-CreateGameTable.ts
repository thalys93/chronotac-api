import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGameTable1756243808354 implements MigrationInterface {
    name = 'CreateGameTable1756243808354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "games" (
                "id" SERIAL NOT NULL, 
                "board" jsonb NOT NULL, 
                "winner" text, 
                "isDraw" boolean NOT NULL DEFAULT false, 
                "currentPlayer" varchar(255) NOT NULL, 
                "playedDate" TIMESTAMP NOT NULL DEFAULT now(), 
                "status" text NOT NULL, 
                CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "games"`);
    }
}


import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1609986995247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "createdat",
                    type: "datetime",
                    isNullable: false
                },
                {
                    name: "isactive",
                    type: "boolean",
                    isNullable: false,
                    default: true
                },
                {
                    name: "firstname",
                    type: "varchar",
                },
                {
                    name: "lastname",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "1000",
                },
                {
                    name: "email",
                    type: "varchar",
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
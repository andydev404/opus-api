import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompaniesTable1611094497293 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "companies",
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
                    name: "name",
                    type: "string",
                    length: "200",
                },
                {
                    name: "userid",
                    type: "integer"
                }
            ]
        }));
        await queryRunner.createForeignKey(
            'companies',
            new TableForeignKey({
                columnNames: ["userid"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('companies');
    }

}
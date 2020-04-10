import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm'

export class createLoginUsernameIndex1586517819466
  implements MigrationInterface {
  private tableName: string
  private tableIndex: TableIndex

  constructor() {
    this.tableName = 'login'
    this.tableIndex = new TableIndex({
      columnNames: ['username'],
      isFulltext: true
    })
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createIndex(this.tableName, this.tableIndex)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropIndex(this.tableName, this.tableIndex)
  }
}

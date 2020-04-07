import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm'

export class createPostsUserIdIndex1586264360184 implements MigrationInterface {
  private tableName: string
  private tableIndex: TableIndex
 
  constructor() {
    this.tableName = 'posts'
    this.tableIndex = new TableIndex({ columnNames: ['user_id'] })
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createIndex(this.tableName, this.tableIndex)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropIndex(this.tableName, this.tableIndex)
  }
}

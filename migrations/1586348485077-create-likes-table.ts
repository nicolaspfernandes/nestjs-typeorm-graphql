import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createLikesTable1586348485077 implements MigrationInterface {
  private tableName: string

  constructor() {
    this.tableName = 'likes'
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    const tableConfiguration = new Table({
      name: this.tableName,
      columns: [{
        name: 'user_id',
        type: 'varchar',
        length: '36',
        isPrimary: true
      }, {
         name: 'post_id',
         type: 'varchar',
         length: '36',
         isPrimary: true 
      }, {
        name: 'created_at',
        type: 'timestamp',
        isNullable: false,
        default: 'CURRENT_TIMESTAMP'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true
      }]
    })
    
    await queryRunner.createTable(tableConfiguration, true)
    
    return queryRunner.createForeignKeys(
      this.tableName,
      [
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        }),
        new TableForeignKey({
          columnNames: ['post_id'],
          referencedTableName: 'posts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        })
      ]
    )
  }

  down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.tableName, true)
  }
}

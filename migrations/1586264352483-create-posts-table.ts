import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createPostsTable1586264352483 implements MigrationInterface {
  private tableName: string

  constructor() {
    this.tableName = 'posts'
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    const tableConfiguration = new Table({
      name: this.tableName,
      columns: [{
        name: 'id',
        type: 'varchar',
        length: '36',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid'
      }, {
         name: 'user_id',
         type: 'varchar',
         length: '36',
         isNullable: false 
      }, {
        name: 'title',
        type: 'varchar',
        length: '50',
        isNullable: false
      }, {
        name: 'description',
        type: 'text',
        isNullable: false
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

    return queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        })
    )
  }

  down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.tableName, true)
  }
}

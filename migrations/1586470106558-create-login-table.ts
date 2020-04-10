import {
  Table,
  QueryRunner,
  TableForeignKey,
  MigrationInterface
} from 'typeorm'

export class createLoginTable1586470106558 implements MigrationInterface {
  private tableName: string

  constructor() {
    this.tableName = 'login'
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
        name: 'username',
        type: 'varchar',
        length: '30'
      }, {
        name: 'password',
        type: 'text'
      },  {
        name: 'salt',
        type: 'text'
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

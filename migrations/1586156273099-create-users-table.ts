import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsersTable1586156273099 implements MigrationInterface {
  private tableName: string

  constructor() {
    this.tableName = 'users'
  }

  up(queryRunner: QueryRunner): Promise<void> {
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
        name: 'first_name',
        type: 'varchar',
        length: '30',
        isNullable: false
      }, {
        name: 'last_name',
        type: 'varchar',
        length: '30',
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
    
    return queryRunner.createTable(tableConfiguration, true)
  }

  down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.tableName, true)
  }
}

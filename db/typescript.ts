import knex from 'knex';
import pg from 'pg';

pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => Number(value));
pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value: string) => Number(value));
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => Number(value));

export const db = knex({
  client: 'pg',
  connection: process.env.DB_CONNECTION,
});

export class DB
{
  static things()
  {
    return db('things');
  }
}

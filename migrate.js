/* Create the sample data in the SQLite database. */

const knex = require('knex');

/** @type {import('knex').Knex} */
const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
});

(async () =>
{
  /* Create the properties table  */
  const propertiesTable = 'properties';
  if(!(await db.schema.hasTable(propertiesTable)))
  {
    await db.schema.createTable(propertiesTable, (table) =>
    {
      table.increments('id');
      table.string('address_line_1').notNullable();
      table.string('address_line_2');
      table.string('image');
      table.text('description');
      table.text('legal_info');
      table.bigint('market_value').defaultTo(0);
      table.bigint('bid_amount').defaultTo(0);
      table.bigint('win_amount').defaultTo(0);
      table.bigint('outbid_amount').defaultTo(0);
    });

    const lorem =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu molestie augue. Nulla molestie rhoncus lectus ut posuere. Etiam at sagittis arcu. Integer bibendum arcu ut vehicula bibendum. Nam viverra a urna eget ultrices. Vivamus in felis scelerisque, laoreet sapien non, tristique metus. Nulla in arcu sodales, posuere risus eu, lobortis nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.';

    /* Seed the sample properties.
      (The property images are uploaded to imgur to simulate a CDN.) */
    await db(propertiesTable).insert([
      {
        address_line_1: '14 Flood St.',
        address_line_2: 'New Orleans, LA 70122',
        image: 'https://i.imgur.com/ACGQScK.png',
        description: `14 Flood St. ${lorem}`,
        legal_info: `14 Flood St. ${lorem}`,
        market_value: 40000,
        bid_amount: 5000,
        win_amount: 100,
      },
      {
        address_line_1: '24 Washington Ave.',
        address_line_2: 'New Orleans, LA 70122',
        image: 'https://i.imgur.com/7rvJ3XK.png',
        description: `24 Washington Ave. ${lorem}`,
        legal_info: `24 Washington Ave. ${lorem}`,
        market_value: 47500,
        bid_amount: 5200,
        outbid_amount: 100,
      },
      {
        address_line_1: '289 Hempstead St.',
        address_line_2: 'New Orleans, LA 70122',
        image: 'https://i.imgur.com/TZaLBv9.png',
        description: `289 Hempstead St. ${lorem}`,
        legal_info: `289 Hempstead St. ${lorem}`,
        market_value: 40000,
        bid_amount: 5000,
      },
      {
        address_line_1: '57 West Ave G.',
        address_line_2: 'New Orleans, LA 70122',
        image: 'https://i.imgur.com/bjdCwUL.png',
        description: `57 West Ave G. ${lorem}`,
        legal_info: `57 West Ave G. ${lorem}`,
        market_value: 45000,
        bid_amount: 5200,
        win_amount: 200,
      },
    ]);
  }

  console.log('Migration successful');
  process.exit();
})();

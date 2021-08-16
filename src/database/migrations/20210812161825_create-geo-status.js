const { table } = require("../knex");

exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try {
            await knex.transaction( async trx => {
                await knex.schema.createTable('geocode_statuses', table => {
                    table.increments('id');
                    table.string('name').notNullable();
                    table.string('color', 10).notNullable();
                });
                await knex.schema.table('orders', async table => {
                    await table.renameColumn('geo_status', 'fk_geocode_statuses');
                    table.integer('fk_geocode_statuses').nullable().unsigned().defaultTo('1')
                    .references('id').inTable('geocode_statuses').index().onDelete('set null');
                });
            });

            resolve();
        } catch(error) {
            reject(error);
        }
    })
};

exports.down = function(knex) {
    return new Promise(async (resolve, reject) => {
        try {
            await knex.transaction( async trx => {
                await knex.schema.table('orders', async table => {
                    await table.renameColumn('fk_geocode_statuses', 'geo_status');
                    table.integer('geo_status').notNullable().defaultTo('1');
                });
                await knex.schema.dropTable('geocode_statuses');
            });

            resolve();
        } catch(error) {
            reject(error);
        }
    })
};

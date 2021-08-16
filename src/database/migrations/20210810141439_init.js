exports.up = function(knex) {
    return new Promise(async (resolve, reject) => {
        try {
            await knex.transaction( async trx => {
                await knex.schema.createTable('transports', table => {
                    table.increments('id');
                    table.string('color', 10).notNullable();
                });
                await knex.schema.createTable('orders', table => {
                    table.increments('id');
                    table.datetime('datetime_add').notNullable().defaultTo(knex.fn.now());
                    table.datetime('datetime_edit').nullable();
                    table.string('town').notNullable();
                    table.string('street').nullable();
                    table.string('number').notNullable();
                    table.string('postal_code').notNullable();
                    table.string('geo_lat').nullable();
                    table.string('geo_long').nullable();
                    table.integer('geo_status').notNullable().defaultTo('10');
                    table.integer('fk_transports').nullable().unsigned()
                    .references('id').inTable('transports').index();
                    table.integer('transports_position').nullable();
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
                await Promise.all([
                    knex.schema.dropTable('orders'),
                    knex.schema.dropTable('transports')
                ]);
            });

            resolve();
        } catch(error) {
            reject(error);
        }
    })
};

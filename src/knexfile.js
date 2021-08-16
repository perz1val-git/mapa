// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '693554311',
            database: 'mapa'
        },
        migrations: {
            directory: __dirname + '/database/migrations'
        },
        seeds: {
            directory: __dirname + '/database/seeds/development'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_database',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/database/migrations'
        },
        seeds: {
            directory: __dirname + '/database/seeds/test'
        }
    },

    production: {
        client: 'tedious',
        //connection: process.env.DATABASE_URL,
        connection: {
            database: 'my_database',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/database/migrations'
        },
        seeds: {
            directory: __dirname + '/database/seeds/test'
        }
    }

};

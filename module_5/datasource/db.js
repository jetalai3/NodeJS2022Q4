import knex from 'knex';
import { config } from '../../config';

export const db = knex({
    client: 'postgres',
    connection: {
        host: config.dbHost,
        port: config.dbPort,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbName
    },
    pool: { min: 0, max: 5 }
});


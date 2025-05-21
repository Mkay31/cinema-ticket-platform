import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { ObjectUtils } from './object.util';
import { Entities } from '../orm';
import { Config } from '../config';
dotenv.config();

export const initDatabase = async (): Promise<void> => {
    const entities = ObjectUtils.getObjectValues(Entities);
    await createConnection({
        // charset: 'utf8mb4',
        database: Config.DB_DATABASE,
        entities,
        host: Config.DB_HOST,
        logging: 'all',
        maxQueryExecutionTime: 1000,
        migrationsRun: false,
        synchronize: true,
        password: Config.DB_PASSWORD,
        port: Config.DB_PORT,
        type: 'mysql',
        username: Config.DB_USERNAME,
    })
        .then(() => {
            console.info('Database connection success');
            return true;
        })
        .catch((e) => console.log(e));
};

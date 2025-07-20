import MongoConnection from "./MongoConnection.mjs";
import config from 'config';
const MONGO_ENV_URI = 'DB.mongodb.env_full_uri';
const DB_NAME = 'DB.mongodb.dbName';
const connection_string: string = config.get(MONGO_ENV_URI);
const dbName: string = config.get(DB_NAME);

export const mongoDbConnection = new MongoConnection(connection_string, dbName)






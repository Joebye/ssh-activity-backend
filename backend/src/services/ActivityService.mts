import { mongoDbConnection } from "../domain/db-instance.mjs";
import config from 'config';
import { logger } from "../logger/logger.mjs";
import { Tail } from 'tail';
import LoginEvent from '../model/LoginEvent.mjs';
import { fileURLToPath } from "url";
import path from "path";
import { ObjectId } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.resolve(__dirname, '../ssh-auth.log');

const LOGIN_EVENTS_COL = 'DB.mongodb.login_events_col';

export default class ActivityService {
    #collectionLoginEvents

    constructor() {
        this.#collectionLoginEvents = mongoDbConnection.getCollection(config.get(LOGIN_EVENTS_COL));
    }

     async getAllLoginEvents() {
    try {
      const allLoginEventsDb = await this.#collectionLoginEvents.find().toArray();
      logger.trace('Login events from db extracted. Count: ' + allLoginEventsDb.length)
      return allLoginEventsDb;
    } catch (error) {
      logger.error('Error extracting messages from db: ', error);
      throw error
    }
  }

  async addLoginEvent(loginEvent: LoginEvent) {
    let res;
    try {
        res = await this.#collectionLoginEvents.insertOne({
          _id: new ObjectId,
          username: loginEvent.username,
          ip: loginEvent.ip,
          timestamp: loginEvent.timestamp
    });
        logger.trace('Login events to the db has been added. Id: ' + res.insertedId)
      } catch (error) {
        logger.error(`error adding loginEvent to the db: `, error);
    }
    return res;
} 

startMonitoringLogFile(onNewLogin?: (event: LoginEvent) => void) {
    const tail = new Tail(logFile);

    tail.on('line', async (line) => {
      const regex = /Accepted \w+ for ([\w-]+) from ([\d.]+) port/;
      const match = line.match(regex);
      if (match) {
        const loginEvent = {
          username: match[1],
          ip: match[2],
          timestamp: new Date()
        };
        await this.addLoginEvent(loginEvent);
        logger.trace({ loginEvent }, 'New SSH login');
        onNewLogin && onNewLogin(loginEvent)
      }
    });

    tail.on('error', (err) => {
      logger.error('Tail error:', err);
    });
  }
}
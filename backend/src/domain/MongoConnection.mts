import { MongoClient, ObjectId } from 'mongodb';

export default class MongoConnection {
    #db
    #client
    constructor(connection_string: string, dbName: string) {
        this.#client = new MongoClient(connection_string);
        this.#db = this.#client.db(dbName);
    }

    getCollection(collectionName: string) {
        return this.#db.collection(collectionName);
    }

    getAllCollections() {
        return this.#db.listCollections();
    }

    public getObjectID(id: any) {
        return new ObjectId(id)
    }

    
}
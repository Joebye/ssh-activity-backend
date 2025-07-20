import { MongoClient, ObjectId } from 'mongodb';

export default class MongoConnection {
    #db
    #client
    constructor(connection_string: string, dbName: string) {
        this.#client = new MongoClient(connection_string);
        this.#db = this.#client.db(dbName);

        this.#client.connect().then(() => {
            console.log("Connected successfully to MongoDB!");
            this.#db = this.#client.db(dbName);
            console.log("Database initialized:", dbName);
            const testCollection = this.#db.collection("test");
            console.log("Collection example:", testCollection.collectionName);
        }).catch((error) => {
            console.error("Failed to connect to MongoDB:", error);
        });
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
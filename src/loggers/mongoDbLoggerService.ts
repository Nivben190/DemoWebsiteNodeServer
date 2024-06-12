
import { getDb } from "../DataAccess/mongo";
export class ErrorLoggerService {
    constructor() {
    }

    public async logError(error: any): Promise<void> {
        
        const db = await getDb() ;
        if(!db) throw new Error('Database not found');
        const collection = db.collection('errors');
        
        await collection.insertOne({ error });
    }

}
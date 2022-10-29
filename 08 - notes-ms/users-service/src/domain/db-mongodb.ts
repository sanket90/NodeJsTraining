import { MongoClient } from 'mongodb'
import { DatabaseError, User } from 'notesapp-core-lib';


export class NotesMongoDB {

    open(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const mongoClient = new MongoClient(process.env.DB_URL as string)
                const database = mongoClient.db("notesapp");
                const users_collection = database.collection("users");


                resolve({ mongoClient, database, users_collection })
            } catch (error) {
                reject(error)
            }   
        })
    }

    async insertUser(newUser: User) {
        try {
            const db = await this.open();
    
            await db.users_collection.insertOne(newUser);

            await db.mongoClient.close()
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async selectUserByEmail(userEmail: string, isAuth = false) {
        try {
            const db = await this.open();
    
            const user_doc = await db.users_collection.findOne({ email: userEmail });

            await db.mongoClient.close()

            const user = new User(user_doc.name, user_doc.email, user_doc.role)
            user.id = user_doc.id

            if (isAuth) {
                user.password = user_doc.password
            }

            return user;
        } catch (error) {
            throw new DatabaseError(error);
        }
    }
}
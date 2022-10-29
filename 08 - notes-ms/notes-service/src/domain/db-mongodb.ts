import { MongoClient } from 'mongodb'
import { DatabaseError, Notes } from 'notesapp-core-lib';


export class NotesMongoDB {

    open(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const mongoClient = new MongoClient(process.env.DB_URL as string)
                const database = mongoClient.db("notesapp");
                const notes_collection = database.collection("notes");


                resolve({ mongoClient, database, notes_collection })
            } catch (error) {
                reject(error)
            }   
        })
    }

    async insertNote(newNote: Notes) {
        try {
            const db = await this.open();
    
            await db.notes_collection.insertOne(newNote);

            await db.mongoClient.close()
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async updateNote(existingNote: Notes) {
        try {
            const db = await this.open();
            
            const filter = { title: existingNote.title }

            const updateDoc = {
                $set: {
                    content: existingNote.content
                }
            }

            const options = { upsert: true }
    
            await db.notes_collection.updateOne(filter, updateDoc, options);
            
            await db.mongoClient.close()
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async selectAllNotes() {
        try {
            const db = await this.open();
    
            const cursor = db.notes_collection.find();
            const notes_docs = await cursor.toArray()

            await db.mongoClient.close()

            const notesList = notes_docs.map((rowItem: any) => {
                return new Notes(rowItem.title, rowItem.content)
            })

            return notesList;
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async selectNoteByTitle(noteTitle: string) {
        try {
            const db = await this.open();
    
            const note_doc = await db.notes_collection.findOne({ title: noteTitle });

            await db.mongoClient.close()

            return new Notes(note_doc.title, note_doc.content)
        } catch (error) {
            throw new DatabaseError(error);
        }
    }
}
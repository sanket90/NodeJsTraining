import { Notes } from 'notesapp-core-lib'

import { NotesMongoDB } from '../domain/db-mongodb.js'

export class NotesService {

    db;

    constructor() {
        this.db = new NotesMongoDB();
    }
    

    async save(title: string, content: string, isNew=true) {
        try {
            const newNote = new Notes(title, content);

            newNote.isValid();

            if (isNew)
                return await this.db.insertNote(newNote);
            else
                return await this.db.updateNote(newNote)
        } catch (error: any) {
            console.log(error.stack);
            throw error;
        }
    }

    async getAll() {
        try {
            const notes = await this.db.selectAllNotes().then().catch();
            

            if (!notes.length) {
                // throw new EmptyRecords("Notes are empty.!")
                return []
            }

            return notes.map((item: Notes) => {
                return { heading: item.title, desctription: item.content }
            })
        } catch (error: any) {
            console.log(error.stack);
            throw error;
        }
    }


    getByTitle(title: string) {
        try {
            return this.db.selectNoteByTitle(title)
        } catch (error: any) {
            console.log(error.stack);
            throw error;
        }
    }


    deleteByTitle(title: string) {
        // this.db.delete(title);
    }
}
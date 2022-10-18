import { Notes } from '../domain/note-entity.js'

import { NotesDB } from '../domain/db.js'
import { NotesMongoDB } from '../domain/db-mongodb.js';
import { BusinessError, EmptyRecords } from '../errors/business-errors.js';

export class NotesService {

    db;

    constructor() {
        // this.db = new NotesDB();
        this.db = new NotesMongoDB()
    }
    

    async save(title, content, isNew=true) {
        try {
            const newNote = new Notes(title, content);

            newNote.isValid();

            if (isNew)
                return await this.db.insertNote(newNote);
            else
                return await this.db.updateNote(newNote)
        } catch (error) {
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

            return notes.map(item => {
                return { heading: item.title, desctription: item.content }
            })
        } catch (error) {
            console.log(error.stack);
            throw error;
        }
    }


    getByTitle(title) {
        try {
            return this.db.selectNoteByTitle(title)
        } catch (error) {
            console.log(error.stack);
            throw error;
        }
    }


    deleteByTitle(title) {
        this.db.notes.delete(title);
    }
}
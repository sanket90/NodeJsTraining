import { Notes } from '../domain/note-entity.js'

import { NotesDB } from '../domain/db.js'
import { BusinessError, EmptyRecords } from '../errors/business-errors.js';

export class NotesService {

    db;

    constructor() {
        this.db = new NotesDB();
    }
    

    save(title, content) {
        try {
            const newNote = new Notes(title, content);

            newNote.isValid();

            return this.db.insertNote(newNote);
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
        return this.db.notes.get(title);
    }


    deleteByTitle(title) {
        this.db.notes.delete(title);
    }
}
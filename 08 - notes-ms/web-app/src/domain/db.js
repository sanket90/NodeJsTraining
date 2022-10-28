import sqlite3 from 'sqlite3';

import { Notes } from './note-entity.js';
import { User } from './user-entity.js';
import { DatabaseError } from '../errors/db-errors.js'

export class NotesDB {

    constructor() {
        this.createTableNote().catch(err => console.error(err.stack));
        this.createTableUser().catch(err => console.error(err.stack));
        // this.alterTableUser().catch(err => console.error(err.stack));
    }
    
    open() {
        return new Promise((resolve, reject) => {
            try {
                const db = new sqlite3.Database(`${process.env.DB_FILE_PATH}`, (err) => {
                    if (err) {
                        reject(err.message);
                    }
                })
    
                resolve(db)
            } catch (error) {
                reject(error);
            }
        })
    }

    run(db, statement, args) {
        return new Promise((resolve, reject) => {
            db.run(statement, args, (err) => {
                try {
                    if (err) {
                        reject(err);
                    } else {
                        resolve()
                    }
                } catch (error) {
                    reject(error);
                }
            })
        });
    }

    get(db, query, params) {
        return new Promise((resolve, reject) => {
            db.get(query, params, (err, row) => {
                try {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row)
                    }
                } catch (error) {
                    reject(error);
                }
            })
        });
    }

    select(db, query, params = []) {
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, result) => {
                try {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error);
                }
            })
        });
    }

    async createTableUser() {
        try {
            const db = await this.open();
            await this.run(db, `CREATE TABLE IF NOT EXISTS users (
                name TEXT,
                email TEXT,
                password TEXT,
                id TEXT
            )`)
            db.close();
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async alterTableUser() {
        try {
            const db = await this.open();
            await this.run(db, `ALTER TABLE users ADD IF NOT EXISTS role TEXT`)
            db.close();
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async createTableNote() {
        try {
            const db = await this.open();
            await this.run(db, `CREATE TABLE IF NOT EXISTS notes (
                title TEXT,
                content TEXT
            )`)
            db.close();
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async insertNote(newNote) {
        try {
            const db = await this.open();
            await this.run(db, `INSERT INTO notes(title, content) VALUES (?, ?)`, [newNote.title, newNote.content])
            db.close();
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async updateNote(existingNote) {
        try {
            const db = await this.open();
            await this.run(db, `UPDATE notes SET content=? WHERE title=?`, [existingNote.content, existingNote.title])
            db.close();
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async selectAllNotes() {
        try {
            const db = await this.open();
            
            const rows = await this.select(db,'SELECT * FROM notes');
            
            db.close();

            const notesList = rows.map((rowItem) => {
                return new Notes(rowItem.title, rowItem.content)
            })

            return notesList;
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async selectNoteByTitle(title) {
        try {
            const db = await this.open();
            
            const rows = await this.select(db,'SELECT * FROM notes WHERE title = ?', [title]);
            
            db.close();

            const rowItem = rows[0];

            return new Notes(rowItem.title, rowItem.content)

        } catch (error) {
            throw new DatabaseError(error);
        }
    }



    async insertUser(newUser) {
        try {
            const db = await this.open();
            await this.run(
                db, `INSERT INTO users(name, email, password, id, role) VALUES (?, ?, ?, ?, ?)`,
                [newUser.name, newUser.email, newUser.password, newUser.id, newUser.role]
            )
            db.close();
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    async selectUserByEmail(email, isAuth = false) {
        try {
            const db = await this.open();
            
            const row = await this.get(db,'SELECT * FROM users WHERE email = ?', [email]);
            
            db.close();

            const user = new User(row.name, row.email, row.role)
            user.id = row.id

            if (isAuth) {
                user.password = row.password
            }

            return user;
        } catch (error) {
            throw new DatabaseError(error);
        }
    }
}
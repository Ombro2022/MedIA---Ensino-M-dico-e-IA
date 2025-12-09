import sqlite3 from 'sqlite3';
import { DB_PATH } from './config.js';

sqlite3.verbose();

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function runCallback(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });

export const findAdminByEmail = (email) => get('SELECT * FROM admins WHERE email = ?', [email.toLowerCase()]);

export const insertAdmin = (email, passwordHash) =>
  run('INSERT INTO admins (email, password_hash) VALUES (?, ?)', [email.toLowerCase(), passwordHash]);

export default db;

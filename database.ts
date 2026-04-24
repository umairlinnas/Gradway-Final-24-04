import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export async function initializeDatabase() {
    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS chat_versions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

export async function saveChatVersion(content: string) {
    const result = await db.run(
        'INSERT INTO chat_versions (content) VALUES (?)',
        content
    );
    return { id: result.lastID, content, created_at: new Date().toISOString() };
}

export async function getChatVersions() {
    return await db.all('SELECT * FROM chat_versions ORDER BY created_at DESC');
}

export async function getChatVersion(id: number) {
    return await db.get('SELECT * FROM chat_versions WHERE id = ?', id);
}

import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        const duration = Date.now() - start;
        console.error('Database Query Error!', {
            text,
            duration,
            error: error instanceof Error ? error.message : error
        });
        throw error; // Re-throw so your backend can send a 500 error to the user
    }
};
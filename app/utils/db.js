import { Pool } from 'pg';

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT, 10),
});

export const connectDB = async () => {
    try {
        const db = await pool.connect();

        console.log("Connect to Database success");

        db.release();

    } catch (error) {
        console.log("Connect to PG Database Failed", error);
    }
}

export const query = (text, params) => {
    return new Promise((resolve, reject) => {
        pool.query(text, params)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
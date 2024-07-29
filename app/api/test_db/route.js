import { NextResponse } from "next/server";
import { pool, connectDB, query } from "@/app/utils/db";

export async function GET() {
    try {
        await connectDB();

        // Create Table user
        const createUserTable = `
            CREATE TABLE IF NOT EXISTS tb_users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(30),
                password VARCHAR(50),
                email VARCHAR(50)
            )
        `;

        // Show user Table
        const showUserTable = `
            SELECT * FROM tb_users
        `

        const result = await query(showUserTable, []);


        return NextResponse.json({ message: `User table create successful`, data: result.rows}, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: 'User table create failed', error: error.message}, {status: 500} );
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const { username, password, email } = await request.json();

        const insertQuery = `
            INSERT INTO tb_users (username, password, email)
            VALUES ($1, $2, $3)
            RETURNING *
        `

        const values = [username, password, email];

        const result = await query(insertQuery, values);

        return NextResponse.json({ message: "Insert user success", result: result}, {status: 201});

    } catch (error) {
        return NextResponse.json({ message: 'Insert user failed', error: error.message}, {status: 500} );
    }
}
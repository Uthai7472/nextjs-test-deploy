import { NextResponse } from "next/server";
import { pool, connectDB, query } from "@/app/utils/db";

export async function DELETE(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
    }

    try {
        await connectDB();

        const deleteUserByID = `
            DELETE FROM tb_users 
            WHERE id = $1
        `;

        const values = [id];
        const result = await query(deleteUserByID, values);

        if (result.rowCount === 0) {
            return NextResponse.json({ message: `User with ID ${id} not found` }, { status: 404 });
        }

        return NextResponse.json({ message: `Delete user ${id} successful`, Users: result.rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Delete user ${id} failed`, error: error.message }, { status: 500 });
    }
}
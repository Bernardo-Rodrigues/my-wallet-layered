import bcrypt from "bcrypt";
import connection from "../database.js";

export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
    
        const existingUsers = await connection.query(
            `SELECT * FROM "users" WHERE "email"=$1`,
            [email]
        );
    
        if (existingUsers.rowCount > 0) {
            return res.sendStatus(409);
        }
    
        const hashedPassword = bcrypt.hashSync(password, 12);
    
        await connection.query(
            `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
            [name, email, hashedPassword]
        );
    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
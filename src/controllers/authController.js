import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database.js";

export async function signIn (req, res)  {
    const { email, password } = req.body;
    try {
        const { rows } = await connection.query(
            `SELECT * FROM "users" WHERE "email"=$1`,
            [email]
        );
        const [user] = rows;
    
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.sendStatus(401);
        }
    
        const token = jwt.sign(
            {
            id: user.id,
            },
            process.env.JWT_SECRET
        );
    
        res.send({
            token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
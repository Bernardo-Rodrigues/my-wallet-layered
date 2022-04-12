import jwt from "jsonwebtoken";
import connection from "../database.js";

export async function createEvent (req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.replace("Bearer ", "");
    
        if (!token) {
            return res.sendStatus(401);
        }
    
        let user;
    
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.sendStatus(401);
        }
    
        const { value, type } = req.body;
    
        await connection.query(
            `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
            [user.id, value, type]
        );
    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function listUserEvents (req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.replace("Bearer ", "");
    
        if (!token) {
            return res.sendStatus(401);
        }
    
        let user;
    
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.sendStatus(401);
        }
    
        const events = await connection.query(
            `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
            [user.id]
        );
    
        res.send(events.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialSum (req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.replace("Bearer ", "");
    
        if (!token) {
            return res.sendStatus(401);
        }
    
        let user;
    
        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.sendStatus(401);
        }
    
        const events = await connection.query(
            `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
            [user.id]
        );
    
        const sum = events.rows.reduce(
            (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
            0
        );
    
        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
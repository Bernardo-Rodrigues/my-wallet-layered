import connection from "../database.js";

export async function insert(userId, value, type){
    const result = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [userId, value, type]
    );

    if(result.rowCount === 0) return false
    return true
}

export async function list(userId){
    const { rows: events } = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [userId]
    );

    return events
}
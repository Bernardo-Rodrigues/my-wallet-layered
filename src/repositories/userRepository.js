import connection from "../database.js"

export async function find(column, value){
    const { rows: [user] } = await connection.query(
        `SELECT * FROM "users" WHERE ${column}=$1`,
        [value]
    );
    
    if(!user) return false;
    return user;
}

export async function insert(name, email, hashedPassword){
    const result = await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );

    if(result.rowCount === 0) return false
    return true
}

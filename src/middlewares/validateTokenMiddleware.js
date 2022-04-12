import Unauthorized from "../errors/UnauthorizedError.js";
import jwt from "jsonwebtoken"

export default async function validateTokenMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) throw new Unauthorized("Invalid token");

    try {   
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;
    } catch (error) {
        throw new Unauthorized("Invalid token");
    }
    
    next();
}
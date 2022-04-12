import * as authService from "../services/authService.js"

export default async function validateTokenMiddleware(req, res, next) {
    const { authorization } = req.headers;
    
    const user = await authService.validateToken(authorization);
    res.locals.user = user;

    next();
}
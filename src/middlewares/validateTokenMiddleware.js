export default async function validateTokenMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token){
      res.sendStatus(401).send("Token is invalid");
      return;
    }
    
    try {
        const user = jwt.verify(token, secretKey);
        res.locals.user = user;
    } catch (error) {
        return res.sendStatus(401);
    }
    
    next();
}
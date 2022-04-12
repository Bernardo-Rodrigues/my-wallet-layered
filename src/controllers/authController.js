import * as authService from "../services/authService.js"

export async function signIn (req, res)  {
    try {
        const token = authService.signIn(req.body)
    
        res.send({ token });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
import * as userService from "../services/userService.js"

export async function signUp(req, res) {
    try {
        userService.signUp(req.body)
    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
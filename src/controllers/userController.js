import * as userService from "../services/userService.js"

export async function signUp(req, res) {
    await userService.signUp(req.body)
    
    res.sendStatus(201);
}
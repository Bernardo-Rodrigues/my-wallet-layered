import * as authService from "../services/authService.js"

export async function signIn (req, res)  {
    const token = await authService.signIn(req.body)
    
    res.send({ token });
}
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js"

export async function signIn({ email, password }){
    const user = userRepository.find("email", email)
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.sendStatus(401);
    }

    const token = jwt.sign(
        {
        id: user.id,
        },
        process.env.JWT_SECRET
    );
    return token;
}
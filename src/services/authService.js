import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Unauthorized from "../errors/UnauthorizedError.js";
import * as userRepository from "../repositories/userRepository.js"

export async function signIn({ email, password }){
    const user = await userRepository.find("email", email)
    if (!user || !bcrypt.compareSync(password, user.password)) throw new Unauthorized("User does not exist");

    const token = jwt.sign(
        {
        id: user.id,
        },
        process.env.JWT_SECRET
    );
    return token;
}

export async function validateToken(authorization){
    const token = authorization?.replace("Bearer ", "");
    if(!token) throw new Unauthorized("Invalid token");

    let user

    try {   
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Unauthorized("Invalid token");
    }

    return user
}
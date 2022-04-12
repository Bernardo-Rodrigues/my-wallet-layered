import bcrypt from "bcrypt";
import * as userRepository from "../repositories/userRepository.js"

export async function signUp({ name, email, password }) {
        const existingUser = userRepository.find("email", email)
        if (existingUser) {
            return res.sendStatus(409);
        }
    
        const hashedPassword = bcrypt.hashSync(password, 12);
    
        const result = userRepository.insert(name, email, hashedPassword)
        if(!result) throw new Error();
}
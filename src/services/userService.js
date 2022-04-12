import bcrypt from "bcrypt";
import Conflict from "../errors/ConflictError.js";
import * as userRepository from "../repositories/userRepository.js"

export async function signUp({ name, email, password }) {
    const existingUser = await userRepository.find("email", email)
    if (existingUser) throw new Conflict("User already exists");

    const hashedPassword = bcrypt.hashSync(password, 12);

    const result = await userRepository.insert(name, email, hashedPassword)
    if(!result) throw new Error();
}
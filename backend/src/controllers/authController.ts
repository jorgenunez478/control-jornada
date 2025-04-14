import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/User";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) : Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const token = generateToken(user.id);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const register = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
        return res.status(400).json({ msg: "El usuario ya existe" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);
        return res.status(201).json({ msg: "Usuario creado", user: newUser });
    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).json({ msg: "Error en el servidor" });
    }
}

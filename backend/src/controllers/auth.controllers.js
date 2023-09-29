import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { TOKEN_SECRET } from "../config.js";

// Registrar nuevo usuario
export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["User already exists"]);
    }
    // Aseguras que la contraseña sea igual a confirmar contraseña
    if (password !== confirmPassword) {
      return res.status(400).json(["Make sure the password and confirm password are correct"]);
    }
    // Encriptas la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Creas el usuario
    const newUser = new User({
      email,
      username,
      password: passwordHash,
    });

    // Guardas el usuario en la base de datos
    const userSaved = await newUser.save();

    // Creas el token (payload)
    const token = await createAccessToken({ id: userSaved._id });
    console.log("El token creado es : ", token);

    // Estableces en una cookie la respuesta
    res.cookie("token", token, {
      // httpOnly: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 86400000, // duración de 24 horas
    });

    // Envias la respuesta
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar el usuario en la base de datos
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found, email not exist" });

    // compara la contraseña que escribe el usuario con la contraseña encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, userFound.password);

    // Si no coincide la contraseña, envia un mensaje de error
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Creas el token (payload)
    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });
    console.log("El token creado es :", token);

    // Estableces en una cookie la respuesta
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 86400000, // duración de 24 horas
    });

    // Envias la respuesta
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Cerrar sesion
export const logout = (req, res) => {
  // vacia el token y expira la cookie
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

// Rutas protegidas verificar si el usuario esta logueado o no
// Perfil del usuario
export const profile = async (req, res) => {
  const UserFound = await User.findById(req.user.id);

  if (!UserFound) return res.status(400).json({ message: "User not found" });
  return res.json({
    id: UserFound._id,
    username: UserFound.username,
    email: UserFound.email,
  });
  res.send("profile");
};

// Verifica el token en el lado del servidor
export const verifyToken = async (req, res) => {
  // Obtiene el token de las cookies
  const { token } = req.cookies;
  console.log(`EL token obtenido de las cookies en req.cookies, auth.controller.js es : ${token}`);

  if (!token) {
    console.log("Unauthorized, No token");
    return res.status(401).json({ message: "Unauthorized, No token" });
  }

  // Verifica el token
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(401).json({ message: "Unauthorized" });

    // Si el token es valido, envia la respuesta
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized, Token not valid" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

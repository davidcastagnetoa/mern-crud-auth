import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { TOKEN_SECRET } from "../config.js";

// Registrar nuevo usuario
export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    language,
    birthDate: birthDateString,
    city,
    country,
    avatar,
  } = req.body;

  // Convertir la cadena de fecha de nacimiento a un objeto Date. Recuerda modificar el backend para asegurar que siempre recibe un Objeto Date, esto es sólo para pruebas en Postman
  const birthDate = req.body.birthDate ? new Date(req.body.birthDate) : undefined;

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
      firstName,
      lastName,
      language,
      birthDate,
      city,
      country,
      avatar,
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
      firstName: userSaved.firstName,
      lastName: userSaved.lastName,
      language: userSaved.language,
      birthDate: userSaved.birthDate,
      city: userSaved.city,
      country: userSaved.country,
      avatar: userSaved.avatar,
    });
  } catch (error) {
    console.log("Error trying to register new user :" + error);
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
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      language: userFound.language,
      birthDate: userFound.birthDate,
      city: userFound.city,
      country: userFound.country,
      avatar: userFound.avatar,
    });
  } catch (error) {
    console.log("Error trying to login :" + error);
    return res.status(500).json({ message: error.message });
  }
};

// Cerrar sesion
export const logout = (req, res) => {
  // vacia el token y expira la cookie
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Token was deleted!" });
};

// Rutas protegidas verificar si el usuario esta logueado o no cookieParser
// Perfil del usuario
export const profile = async (req, res) => {
  const UserFound = await User.findById(req.user.id);

  if (!UserFound) {
    console.log("Usuario no encontrado");
    return res.status(400).json({ message: "User not found" });
  }
  console.log("Usuario encontrado, estos son sus datos: " + JSON.stringify(res.json));
  return res.json({
    id: UserFound._id,
    username: UserFound.username,
    email: UserFound.email,
    firstName: UserFound.firstName,
    lastName: UserFound.lastName,
    language: UserFound.language,
    birthDate: UserFound.birthDate,
    city: UserFound.city,
    country: UserFound.country,
    avatar: UserFound.avatar,
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
    if (err) {
      console.log("Error al verificar token. No autorizado");
      return res.sendStatus(401).json({ message: "Unauthorized" });
    }

    // Si el token es valido, envia la respuesta
    const userFound = await User.findById(user.id);
    if (!userFound) {
      console.log("Token no valido, No autorizado");
      return res.status(401).json({ message: "Unauthorized, Token not valid" });
    }

    console.log(
      "Usuario encontrado, token verificado estos son sus datos: " + JSON.stringify(res.json)
    );
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      language: userFound.language,
      birthDate: userFound.birthDate,
      city: userFound.city,
      country: userFound.country,
      avatar: userFound.avatar,
    });
  });
};

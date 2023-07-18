import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Registrar nuevo usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["User already exists"]);
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
    // Estableces en una cookie la respuesta
    res.cookie("token", token);
    // Envias la respuesta
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updateAt,
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
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // compara la contraseña que escribe el usuario con la contraseña encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, userFound.password);

    // Si no coincide la contraseña, envia un mensaje de error
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Creas el token (payload)
    const token = await createAccessToken({ id: userFound._id });

    // Estableces en una cookie la respuesta
    res.cookie("token", token);

    // Envias la respuesta
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updateAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    createdAt: UserFound.createdAt,
    updateAt: UserFound.updateAt,
  });
  res.send("profile");
};

export const verify = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    // const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
  });
};

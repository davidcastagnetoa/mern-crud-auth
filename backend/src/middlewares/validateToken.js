import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  console.log(`EL token obtenido de cookies , validateToken.js es : ${token}`);

  if (!token) {
    console.log("No token, acceso denegado");
    return res.status(401).json({ message: "No token: Access denied" });
  }

  // jwt.verify(token, TOKEN_SECRET, (error, user) => {
  //   if (error) {
  //     console.log("Token Invalido, acceso denegado");
  //     return res.status(401).json({ message: "Invalid token" });
  //   }
  //   req.user = user;
  //   next();
  // });

  // Verifica el token
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log("Error al verificar token. No autorizado");
      return res.sendStatus(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};

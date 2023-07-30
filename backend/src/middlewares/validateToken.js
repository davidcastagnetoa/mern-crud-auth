import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token: Access denied" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    
    next();
  });
};

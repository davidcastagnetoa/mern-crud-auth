// el token es la crendencial o el string que devuevle el frontend confirma que el usuario se ha logueado como un pase o ticket
// se crea el token con el id del usuario

import dotenv from "dotenv";
import { TOKEN_SECRET } from "../config.js";

import jwt from "jsonwebtoken";

// export function createAccessToken(payload) {
//   console.log(process.env.TOKEN_SECRET);
//   return new Promise((resolve, reject) => {
//     jwt.sign(
//       payload,
//       process.env.TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       },
//       (error, token) => {
//         if (error) reject(error);
//         resolve(token);
//       }
//     );
//   });
// }

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    console.log("Remember to delete this line, the TOKE_SECRET is :" + TOKEN_SECRET);
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) {
          console.log("Error signing token: ", error);
          reject(error);
        }
        resolve(token);
      }
    );
  });
}

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);
        },
        message:
          "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Ingrese un correo electrónico válido",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);

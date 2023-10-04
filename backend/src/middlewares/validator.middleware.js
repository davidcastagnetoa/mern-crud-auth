export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Convierte birthDate a objeto Date si es necesario. Recuerda modificar el backend para asegurar que siempre recibe un Objeto Date, esto es sólo para pruebas en Postman
    if (req.body.birthDate && typeof req.body.birthDate === "string") {
      req.body.birthDate = new Date(req.body.birthDate);
    }
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log("Error in validate schema: " + error);
    return res.status(400).json(error.errors.map((err) => err.message));
  }
};

import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// }

// export default connectDB;

export const connectDB = async () => {
  try {
    // localhost or 127.0.0.1
    // await mongoose.connect("mongodb://127.0.0.1/merndb");
    // Mongo DB
    await mongoose.connect(
      "mongodb+srv://davidcastagneto:Nefthis1989@mern-users.nwszua8.mongodb.net/"
    );
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error);
  }
};

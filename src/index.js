import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();

app.get("/", (req, res) => {
  res.send("Greetings, Chief Master");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

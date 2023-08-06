import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Greetings, Chief Master");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

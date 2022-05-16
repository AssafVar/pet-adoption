import express from "express";
import "dotenv/config";
import homeRoutes from "./routes/homeRoutes.js"
import petsRoutes from "./routes/petsRoutes.js"
import usersRoutes from "./routes/usersRoutes.js"
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

app.use("/", homeRoutes);
app.use("/pet", petsRoutes);
app.use("/user",usersRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});

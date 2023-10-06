import express, { Application } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { errorMiddleware } from "./middleware/error";
import cors from "cors";
import { router } from "./routes/routes";

const app: Application = express();

const env = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

mongoose
  .connect(env!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

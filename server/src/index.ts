import express from "express";
import cors from "cors";

import healthRouter from "./routes/health";

import { loadStore } from "./data/store";
loadStore();


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/health", healthRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

import express from "express";
import cors from "cors";

import healthRouter from "./routes/health";
import authRouter from "./routes/auth";
import homeRouter from "./routes/home";
import profileRouter from "./routes/profile";
import trainingSessionsRouter from "./routes/trainingSessions";


import { loadStore } from "./data/store";
loadStore();


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/training-sessions", trainingSessionsRouter);


const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

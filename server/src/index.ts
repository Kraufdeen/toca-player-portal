import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

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

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

const clientDistPath = path.resolve(process.cwd(), "../client/dist");
const hasClientBuild = fs.existsSync(clientDistPath);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST ?? "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});

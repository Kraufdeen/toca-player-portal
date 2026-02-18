import express from "express";
import cors from "cors";

import healthRouter from "./routes/health";
import playersRouter from "./routes/players";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/health", healthRouter);
app.use("/api/players", playersRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

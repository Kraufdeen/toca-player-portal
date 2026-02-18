import { Router } from "express";

const router = Router();

// Mock data for now (we'll replace with DB later)
const players = [
  { id: "1", name: "Alex Morgan", position: "FWD" },
  { id: "2", name: "Luka Modrić", position: "MID" },
];

router.get("/", (_req, res) => {
  res.json({ players });
});

router.get("/:id", (req, res) => {
  const player = players.find((p) => p.id === req.params.id);
  if (!player) return res.status(404).json({ error: "Player not found" });
  res.json({ player });
});

export default router;

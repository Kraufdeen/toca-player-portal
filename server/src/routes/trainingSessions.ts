import { Router } from "express";
import {
  findProfileByEmail,
  getTrainingSessionById,
  getTrainingSessionsByPlayerId,
} from "../data/store";

const router = Router();

/**
 * GET /api/training-sessions?email=...
 * Returns all training sessions for a player (newest first).
 */
router.get("/", (req, res) => {
  const email = String(req.query.email ?? "").trim();

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const player = findProfileByEmail(email);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  const sessions = getTrainingSessionsByPlayerId(player.id).sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return res.json({ playerId: player.id, trainingSessions: sessions });
});

/**
 * GET /api/training-sessions/:id
 * Returns a single session by id for the Session Details screen.
 */
router.get("/:id", (req, res) => {
  const sessionId = String(req.params.id ?? "").trim();

  if (!sessionId) {
    return res.status(400).json({ error: "Session id is required" });
  }

  const session = getTrainingSessionById(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Training session not found" });
  }

  return res.json({ trainingSession: session });
});

export default router;

import { Router } from "express";
import { findProfileByEmail, getHomeData } from "../data/store";

const router = Router();

router.get("/", (req, res) => {
  const email = String(req.query.email ?? "").trim();

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const player = findProfileByEmail(email);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  const { pastTrainingSessions, futureAppointments } = getHomeData(player.id);

  return res.json({ player, pastTrainingSessions, futureAppointments });
});

export default router;

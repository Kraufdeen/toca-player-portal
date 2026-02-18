import { Router } from "express";
import { findProfileByEmail } from "../data/store";

const router = Router();

/**
 * GET /api/profile?email=...
 * Returns the player's profile info for the Profile screen.
 */
router.get("/", (req, res) => {
  const email = String(req.query.email ?? "").trim();

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const profile = findProfileByEmail(email);

  if (!profile) {
    return res.status(404).json({ error: "Player not found" });
  }

  return res.json({ player: profile });
});

export default router;

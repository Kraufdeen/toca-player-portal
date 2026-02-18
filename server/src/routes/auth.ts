import { Router } from "express";
import { findProfileByEmail } from "../data/store";

const router = Router();

router.post("/signin", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const profile = findProfileByEmail(email);

  if (!profile) {
    return res.status(404).json({ error: "Player not found" });
  }

  res.json({ player: profile });
});

export default router;

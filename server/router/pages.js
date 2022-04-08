import express from "express";
import { Highscore } from "../db.js";
import { highscoreElem } from "../wordle/highscoreElem.js";
import { sortAll, sortTopTen } from "../wordle/sortFunc.js";

const router = express.Router();

router.get("/highscores", async (req, res) => {
  console.info("yes");
  const scores = await Highscore.find();
  const result = sortTopTen(scores);
  res.render("highscore", {
    highscore: highscoreElem(result.topTen),
  });
});
router.get("/", async (req, res) => {
  res.send("hello");
});

export default router;

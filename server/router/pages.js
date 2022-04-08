import express from "express";
import {
    Highscore
} from "../db.js";
import {
    highscoreElem
} from "../wordle/highscoreElem.js";
import {
    sortAll,
    sortTopTen,
    sortTopTen2
} from "../wordle/sortFunc.js";

const router = express.Router();

router.get("/", async(req, res) => {
    res.send("hello");
});
router.get("/highscores", async(req, res) => {
    const scores = await Highscore.find();
    const playerId = req.query.id;
    const result = sortTopTen2(scores, playerId);


    res.render("highscore", {
        highscore: highscoreElem(result.topTen),
        rankOfUser: result.userRank + 1,

    });
});

router.get("/highscores/sorted", async(req, res) => {
    const wordLength = parseInt(req.query.wordLength);
    const wordType = req.query.type;
    const playerId = req.query.id;
    console.log(wordLength, wordType, playerId);

    const scores = await Highscore.find();
    if (wordLength === 3 && wordType === "all") {
        const filtered = sortTopTen2(scores, playerId);
        res.render("highscore", {
            highscore: highscoreElem(filtered.topTen),
            rankOfUser: filtered.userRank + 1,
        });
    } else {
        const filtered = sortAll(scores, playerId, wordLength, wordType);
        res.render("highscore", {
            highscore: highscoreElem(filtered.scores),
            rankOfUser: filtered.userRank + 1,
        });
    }
});
router.get("/info", async(req, res) => {
    res.render('info');
});

export default router;
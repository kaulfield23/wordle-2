import express from "express";
import {
    Highscore
} from "../db.js";
import fs from 'fs/promises';
import {
    highscoreElem
} from "../wordle/highscoreElem.js";
import {
    sortAll,
    sortTopTen
} from "../wordle/sortFunc.js";

const router = express.Router();

router.get("/", async(req, res) => {
    res.send("hello");
});

//highscore first page before user put filters
router.get("/highscores", async(req, res) => {
    const scores = await Highscore.find();
    const playerId = req.query.id;
    const result = sortTopTen(scores, playerId);

    res.render("highscore", {
        highscore: highscoreElem(result.topTen),
        rankOfUser: result.userRank + 1,

    });
});
//returns highscores of filtering
router.get("/highscores/sorted", async(req, res) => {
    const wordLength = parseInt(req.query.wordLength);
    const wordType = req.query.type;
    const playerId = req.query.id;

    const scores = await Highscore.find();
    if (wordLength === 3 && wordType === "all") {
        const filtered = sortTopTen(scores, playerId);
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
    const fileBuf = await fs.readFile('./server/statics/info.html');
    res.type('html');
    res.send(fileBuf)
});
export default router;
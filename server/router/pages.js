import express from "express";
import {
    Highscore
} from "../db.js"
import {
    highscoreElem
} from "../wordle/highscoreElem.js";
import {
    sortAll,
    sortTopTen
} from "../wordle/sortFunc.js";

const router = express.Router();


router.get("/highscores", async(req, res) => {
    console.info("yes");
    const scores = await Highscore.find();
    const result = sortTopTen(scores)
    res.render('highscore', {
        highscore: highscoreElem(result.topTen)
    });
})

// router.get("/highscore/sorted", async(req, res) => {
//     const wordLength = parseInt(req.query.wordLength);
//     const wordType = req.query.type
//     const playerId = req.query.id

//     const scores = await Highscore.find();
//     if (wordLength === 3 && wordType === "all") {

//         const filtered = sortTopTen(scores, playerId)
//         res.render('highscore', {
//             highscore: highscoreElem(filtered.topTen),
//             rankOfUser: filtered.userRank + 1
//         })

//     } else {
//         const filtered = sortAll(scores, playerId, wordLength, wordType)

//         res.render('highscore', {
//             highscore: highscoreElem(filtered.scores),
//             rankOfUser: filtered.userRank + 1
//         })
//     }
// });

export default router;
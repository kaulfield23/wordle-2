import express from "express";
import fetchWords from "./wordlists.js";
import chooseWord from "../functions/chooseWord.js";
import {
    v4
} from "uuid";
import verifyWord from "../functions/verifyWord.js";
import {
    Highscore
} from "../db.js"
import {
    highscoreElem
} from "../functions/highscoreElem.js";

import {
    sortFuncAll,
    sortFuncTopTen
} from "../functions/sortFunc.js";

const router = express.Router();

const GAMES = [];

router.post("/games", async(req, res) => {
    const wordLength = parseInt(req.query.wordlength);
    const wordType = req.query.type;
    const words = await fetchWords();
    const filteredWord = chooseWord(words, wordLength, wordType);
    const game = {
        correctWord: filteredWord,
        guesses: [],
        id: v4(),
        wordType: wordType
    };
    GAMES.push(game);
    res.status(201).json({
        id: game.id,
    });
});

router.post("/games/:userId/guess", async(req, res) => {
    let result;
    let usersGuess = req.body.guessWord;
    const isPlaying = GAMES.find((savedOne) => savedOne.id === req.params.userId);
    if (isPlaying) {
        result = verifyWord(usersGuess, isPlaying.correctWord);
        isPlaying.guesses.push(usersGuess);
        res.status(201).json(result);
    } else {
        res.status(404).end();
    }
});

router.post("/games/:userId/highscore", async(req, res) => {
    const id = req.params.userId;
    const usersGame = GAMES.find((savedOne) => savedOne.id === id)

    if (usersGame) {
        const userName = req.body.name;
        const userPlayTime = req.body.playTime;
        const min = Math.floor((userPlayTime.time / 60) % 60) + " min"
        const ten = req.body.playTime.ten;
        const sec = ("0" + (userPlayTime.time % 10)).slice(1)
        const userScore = {
            userId: id,
            name: userName,
            playTime: `${min} ${ten}${sec} sec`,
            timer: userPlayTime.time,
            guesses: usersGame.guesses.length,
            wordLength: usersGame.correctWord.length,
            wordType: usersGame.wordType,
            correctWord: usersGame.correctWord
        }
        const score = new Highscore(userScore)
        score.save()
        res.send({
            msg: userScore
        })
    } else {
        res.status(404).end()
    }

})

// router.get("/highscore/:userId/", async(req, res) => {
//     const playerId = req.params.userId
//     const scores = await Highscore.find();
//     scores.sort((a, b) => a.timer - b.timer);
//     if (playerId) {
//         const userRank = scores.findIndex((item) => item.userId === playerId)
//         let topTen = scores.splice(0, 10)
//         res.render('highscore', {
//             highscore: highscoreElem(topTen),
//             rankOfUser: userRank + 1
//         })
//     } else {
//         let topTen = scores.splice(0, 10)
//         res.render('highscore', {
//             highscore: highscoreElem(topTen)
//         })
//     }

// });

router.get("/highscore/:userId/sort", async(req, res) => {
    const wordLength = parseInt(req.query.wordLength);
    const wordType = req.query.type
    const playerId = req.params.userId

    const scores = await Highscore.find();
    if (wordLength === 3 && wordType === "all") {
        sortFuncTopTen(scores, playerId, res)
    } else {
        sortFuncAll(scores, playerId, wordLength, wordType, res)
    }
});

export default router;
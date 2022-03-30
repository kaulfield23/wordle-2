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
    renderHighscores
} from "../functions/renderHighscores.js";


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
    console.log(isPlaying.correctWord, "correct word");
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

router.get("/highscore", async(req, res) => {
    const scores = await Highscore.find();
    // scores.map((item) => console.log(item.name))
    res.render('highscore', {
        highscore: renderHighscores(scores)
    })

});

export default router;
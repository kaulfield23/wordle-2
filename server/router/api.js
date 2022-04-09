import express from "express";
import fetchWords from "../wordle/fetchWordlists.js";
import chooseWord from "../wordle/chooseWord.js";
import {
    v4
} from "uuid";
import verifyWord from "../wordle/verifyWord.js";
import {
    Highscore
} from "../db.js"


const router = express.Router();

const GAMES = [];
//give user Id for start the game and save game info to GAMES
router.post("/games", async(req, res) => {
    const wordLength = parseInt(req.query.wordlength);
    const wordType = req.query.type;
    const wordList = await fetchWords();

    const filteredWord = chooseWord(wordList, wordLength, wordType);
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
    console.log('correct word ', game.correctWord)
});

//compare user's guessing word and return result
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

//get user's game name and playtime, save it to highscore
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
            msg: "hello"
        })
    } else {
        res.status(404).end()
    }

})


export default router;
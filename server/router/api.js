import express from "express";
import fetchWords from "./wordlists.js";
import chooseWord from "../functions/chooseWord.js";
import { v4 } from "uuid";
import verifyWord from "../functions/verifyWord.js";

const router = express.Router();

const GAMES = [];

router.post("/games", async (req, res) => {
  const wordLength = parseInt(req.query.wordlength);
  const wordType = req.query.type;
  const words = await fetchWords();
  const filteredWord = chooseWord(words, wordLength, wordType);
  const game = {
    correctWord: filteredWord,
    guesses: [],
    id: v4(),
  };
  GAMES.push(game);
  res.status(201).json({
    id: game.id,
  });
});

router.post("/games/:userId/guess", async (req, res) => {
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
  console.log(GAMES, "GAME");
});
router.get("/highscore", (req, res) => {
  // const htmlBuf = await fs.readFile('../../client/src/components/pages/Highscore.jsx');
  // const htmlText = htmlBuf.toString().replace('%body%', 'hello')
  // res.send(htmlText)
  // const indexFile = path.resolve('./client/public/index.html')
  // fs.readFile(indexFile, 'utf8', (err, data) => {
  //         console.log(data, 'index')
  //         if (err) {
  //             console.log('error occur', err);
  //             return res.status(500).send('errorrrr');
  //         }
  //         return res.send(
  //             data.replace('<div id="main"></div>', '<div id="main"><h1>hello</h1></div>')
  //         )
  //     })
  res.send({
    message: "hellooo",
  });
});

export default router;

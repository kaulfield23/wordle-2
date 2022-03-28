import express from 'express';
import fetchWords from './wordlists.js';
import chooseWord from './functions/chooseWord.js';
import {
    v4
} from 'uuid';

const router = express.Router();

const GAMES = [];
// router.post('/userId', async(req, res) => {
//     res.status(201).json({
//         id: v4()
//     })
// })

router.post('/games', async(req, res) => {
    const wordLength = parseInt(req.query.wordlength);
    const wordType = req.query.type;
    const words = await fetchWords();
    const filteredWord = chooseWord(words, wordLength, wordType)
    const game = {
        correctWord: filteredWord,
        guesses: [],
        id: v4(),
    }
    GAMES.push(game)
    console.log(filteredWord, game.id, 'userId')
    res.status(201).json({
        id: game.id
    })
})

router.get('/highscore', (req, res) => {
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
        message: "hellooo"
    })
})

export default router
import {
    highscoreElem
} from "./highscoreElem.js";

export const sortFuncAll = (scores, playerId, wordLength, wordType, res) => {

    const filtered = scores.sort((a, b) => a.timer - b.timer).filter((item) => {
        if (wordType === "all") {
            return item.wordLength === wordLength;
        } else if (wordLength === 3) {
            return item.wordType === wordType;
        } else {
            return item.wordLength === wordLength && item.wordType == wordType
        }
    });
    const userRank = filtered.findIndex((item) => item.userId === playerId)

    // let result = `<h1> There is no result </h1>`
    // if (!filtered) {
    //     res.render('highscore', {
    //         result
    //     })
    // } else {

    // }
    res.render('highscore', {
        highscore: highscoreElem(filtered),
        rankOfUser: userRank + 1
    })
}

export const sortFuncTopTen = (scores, playerId, res) => {
    scores.sort((a, b) => a.timer - b.timer);
    if (playerId) {
        const userRank = scores.findIndex((item) => item.userId === playerId)
        let topTen = scores.splice(0, 10)
        res.render('highscore', {
            highscore: highscoreElem(topTen),
            rankOfUser: userRank + 1
        })
    } else {
        let topTen = scores.splice(0, 10)
        res.render('highscore', {
            highscore: highscoreElem(topTen)
        })
    }
}
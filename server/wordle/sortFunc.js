export const sortAll = (scores, playerId, wordLength, wordType) => {

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
    console.log(userRank, 'userrrarnark')
    return {
        scores: filtered,
        userRank: userRank
    }
}

export const sortTopTen2 = (scores, playerId) => {
    scores.sort((a, b) => a.timer - b.timer);
    const userRank = scores.findIndex((item) => item.userId === playerId)
    console.log(userRank, 'userrank')
    let topTen = scores.splice(0, 10)
    return {
        userRank: userRank,
        topTen: topTen
    }
}



export const sortTopTen = (scores) => {
    scores.sort((a, b) => a.timer - b.timer);
    let topTen = scores.splice(0, 10)
    return {
        topTen: topTen
    }

}
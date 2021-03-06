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
    let topTen = filtered.splice(0, 10)
    return {
        scores: topTen,
        userRank: userRank
    }
}

export const sortTopTen = (scores, playerId) => {
    scores.sort((a, b) => a.timer - b.timer);
    const userRank = scores.findIndex((item) => item.userId === playerId)
    let topTen = scores.splice(0, 10)
    return {
        userRank: userRank,
        topTen: topTen
    }
}
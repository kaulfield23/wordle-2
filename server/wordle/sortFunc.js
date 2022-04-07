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

    return {
        scores: filtered,
        userRank: userRank
    }
}

// export const sortTopTen = (scores, playerId) => {
//     scores.sort((a, b) => a.timer - b.timer);
//     if (playerId) {
//         const userRank = scores.findIndex((item) => item.userId === playerId)
//         let topTen = scores.splice(0, 10)
//         return {
//             userRank: userRank,
//             topTen: topTen
//         }
//     }
// }
export const sortTopTen = (scores) => {
    scores.sort((a, b) => a.timer - b.timer);
    let topTen = scores.splice(0, 10)
    return {
        topTen: topTen
    }

}
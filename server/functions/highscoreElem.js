export const highscoreElem = (item) => item.map(item => {
    return {
        userId: item.userId,
        name: item.name,
        playTime: item.playTime,
        guesses: item.guesses,
        wordLength: item.wordLength,
        wordType: item.wordType,
        correctWord: item.correctWord
    }
})
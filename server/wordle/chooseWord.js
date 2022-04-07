const chooseWord = (input, numberOfWord, indication) => {
    let filteredWordList = input
        //filter the length first
        .filter((item) => item.length === numberOfWord)
        .filter((word) => {
            let isDuplicated = false;
            //check if there is a same character behind the word[i]
            for (let i = 0; i < numberOfWord; i++) {
                if (word.slice(i + 1).includes(word[i])) {
                    i = numberOfWord;
                    isDuplicated = true;
                }
            }
            if (
                (isDuplicated && indication === "repeating") ||
                (!isDuplicated && indication === "unique")
            ) {
                return true;
            }
        });
    let output =
        filteredWordList.length === 0 ?
        `There is no matching word for it` :
        filteredWordList[
            Math.floor(Math.random() * (filteredWordList.length - 1))
        ];
    return output;
};

export default chooseWord;
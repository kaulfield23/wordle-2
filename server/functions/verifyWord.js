const verifyWord = (inputGuessingWord, inputCorrectWord) => {
    let guessingWord = inputGuessingWord.toUpperCase().split("");
    let correctWord = inputCorrectWord.toUpperCase().split("");
    let result = [];

    //when every char is correct
    if (guessingWord.join("") === correctWord.join("")) {
        guessingWord.forEach((char) =>
            result.push({
                letter: char,
                result: "Correct"
            })
        );
        return result;
    } else {
        guessingWord.forEach((char, index) => {
            let charIsAtCorrectPosition = char === correctWord[index];
            let charExists = correctWord.includes(char);

            if (charExists && charIsAtCorrectPosition) {
                //give Correct
                result.push({
                    letter: char,
                    result: "Correct"
                });
            } else if (charExists && !charIsAtCorrectPosition) {
                //give Misplaced no matter what when character exists and not at the same position
                result.push({
                    letter: char,
                    result: "Misplaced"
                });
            } else {
                //give incorrect if it doesn't exist
                result.push({
                    letter: char,
                    result: "Incorrect"
                });
            }
        });
    }

    guessingWord
        .filter((item, idx, array) => array.indexOf(item) === idx)
        .forEach((character) => {
            //check duplicated characters in guessing word
            const duplicatedCharInGuess = guessingWord.filter(
                (char) => char === character
            ).length;
            //check duplicated characters in correct word
            const duplicatedCharInCorrect = correctWord.filter(
                (char) => char === character
            ).length;

            // if number of duplicated chars in guessing word are more than correct word
            // then it will change misplaced to incorrect from the end of the array
            // because only number of duplicatedCharInCorrect's 'misplaced' can be remained as 'Misplaced'
            if (
                duplicatedCharInGuess > duplicatedCharInCorrect &&
                duplicatedCharInGuess >= 2
            ) {
                let remove = duplicatedCharInGuess - duplicatedCharInCorrect;
                result
                    .filter(
                        (item) => item.letter === character && item.result === "Misplaced"
                    )
                    .reverse()
                    .forEach((item) => {
                        if (remove > 0) {
                            item.result = "Incorrect";
                        }
                        remove--;
                    });
            }
        });

    return result;
};

export default verifyWord
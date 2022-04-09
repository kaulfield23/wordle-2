import chooseWord from "../wordle/chooseWord.js";

describe("choose word from word list", () => {
    it("should return the word that the length is same as numberOfWord", () => {
        let input = ["hello", "world", "meh"];
        let numberOfWord = 5;
        let indication = "repeating";
        const result = chooseWord(input, numberOfWord, indication);

        expect(result.length).toEqual(numberOfWord);
    });

    it("should return word that has duplicated characters and word length is 5", () => {
        let input = ["hello", "world", "meh"];
        let numberOfWord = 5;
        let indication = "repeating";
        const result = chooseWord(input, numberOfWord, indication);

        expect(result).toEqual("hello");
    });
    it("should return random word that has duplicated characters and word length is 5", () => {
        let input = [
            "hello",
            "hamburger",
            "maybe",
            "sorry",
            "wordle",
            "difficult",
            "easy",
            "sleep",
            "tired",
            "water",
            "drink",
            "pho",
            "hi",
            "pizza",
            "hatch",
        ];
        let numberOfWord = 5;
        let indication = "repeating";

        let duplicatedWord = ["hello", "sorry", "sleep", "pizza", "hatch"];
        const result = chooseWord(input, numberOfWord, indication);

        expect(duplicatedWord.includes(result)).toEqual(true);
    });

    it("should return word that has not duplicated characters and word length is 5", () => {
        let input = ["hello", "world", "meh"];
        let numberOfWord = 5;
        let indication = "unique";
        const result = chooseWord(input, numberOfWord, indication);

        expect(result).toEqual("world");
    });

    it("should return random word that has not duplicated characters and word length is 5", () => {
        let input = [
            "hello",
            "hamburger",
            "maybe",
            "sorry",
            "wordle",
            "difficult",
            "easy",
            "sleep",
            "tired",
            "water",
            "drink",
            "pho",
            "hi",
            "pizza",
            "hatch",
        ];
        let numberOfWord = 5;
        let indication = "unique";

        let noDuplicatedWord = ["maybe", "tired", "water", "drink"];
        const result = chooseWord(input, numberOfWord, indication);

        expect(noDuplicatedWord.includes(result)).toEqual(true);
    });
    it("should return error msg when there are no matching result", () => {
        let input = [
            "hello",
            "hamburger",
            "maybe",
            "sorry",
            "wordle",
            "difficult",
            "easy",
            "sleep",
            "tired",
            "water",
            "drink",
            "pho",
            "hi",
            "pizza",
            "hatch",
        ];
        let numberOfWord = 8;
        let indication = "unique";

        const result = chooseWord(input, numberOfWord, indication);

        expect(result).toEqual("There is no matching word for it");
    });
});
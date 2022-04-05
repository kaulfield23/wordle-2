import verifyWord from "../functions/verifyWord.js";

describe("wordle algoritm", () => {
    it("should return correct on first try", () => {
        const result = verifyWord("hello", "hello");
        const randomNum = Math.floor(Math.random() * 4 + 1);

        expect(result[randomNum].result).toEqual("Correct");
    });

    it("should say first character is correct placed but all other characters are incorrect", () => {
        const result = verifyWord("hwwww", "hello");
        const randomNum = Math.floor(Math.random() * 4 + 1);

        expect(result[0].result).toEqual("Correct");
        expect(result[randomNum].result).toEqual("Incorrect");
    });

    it("should say misplaced when there is a character in correct word but placed wrong.", () => {
        const result = verifyWord("hwwew", "hello");
        const randomNum = Math.floor(Math.random() * 4 + 1);

        expect(result[3].result).toEqual("Misplaced");
    });

    it("should say correct / misplaced / incorrect when guessing word has more same character than original character ", () => {
        const result = verifyWord("hlalo", "heloo");

        expect(result[0].result).toEqual("Correct");
        expect(result[1].result).toEqual("Misplaced");
        expect(result[2].result).toEqual("Incorrect");
        expect(result[3].result).toEqual("Incorrect");
        expect(result[4].result).toEqual("Correct");
    });

    it("should give Misplaced or Correct when guessing word has more duplicated word than correct word and one of character's position is right", () => {
        const result = verifyWord("Halaa", "Cykla");

        expect(result[0].result).toEqual("Incorrect");
        expect(result[1].result).toEqual("Incorrect");
        expect(result[2].result).toEqual("Misplaced");
        expect(result[3].result).toEqual("Incorrect");
        expect(result[4].result).toEqual("Correct");
    });

    it("should give Misplaced or Incorrect when guessing word has more duplicated word than correct word and one of character's position is not right ", () => {
        const result = verifyWord("hlalo", "heloo");

        expect(result[0].result).toEqual("Correct");
        expect(result[1].result).toEqual("Misplaced");
        expect(result[2].result).toEqual("Incorrect");
        expect(result[3].result).toEqual("Incorrect");
        expect(result[4].result).toEqual("Correct");
    });

    it("check when correct character has more duplicated character", () => {
        const result = verifyWord("Hclea", "Cylla");

        expect(result[0].result).toEqual("Incorrect");
        expect(result[1].result).toEqual("Misplaced");
        expect(result[2].result).toEqual("Correct");
        expect(result[3].result).toEqual("Incorrect");
        expect(result[4].result).toEqual("Correct");
    });

    it("check case when guessing word has 3 same characters ", () => {
        const result = verifyWord("Llloo", "hllll");

        expect(result[0].result).toEqual("Misplaced");
        expect(result[1].result).toEqual("Correct");
        expect(result[2].result).toEqual("Correct");
        expect(result[3].result).toEqual("Incorrect");
        expect(result[4].result).toEqual("Incorrect");
    });

    it("test Richard's example", () => {
        const result = verifyWord("hallå", "cykla");

        expect(result[0].result).toEqual("Incorrect");
        expect(result[1].result).toEqual("Misplaced");
        expect(result[2].result).toEqual("Incorrect");
        expect(result[3].result).toEqual("Correct");
        expect(result[4].result).toEqual("Incorrect");
    });
});